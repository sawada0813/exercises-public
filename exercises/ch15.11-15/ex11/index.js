// 写経したけど使ってない
class Tile {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  static *tiles(width, height, numRows, numCols) {
    const columnWidth = Math.ceil(width / numCols);
    const rowHeight = Math.ceil(height / numRows);

    for (let row = 0; row < numRows; row++) {
      const tileHeight =
        row < numRows - 1 ? rowHeight : height - rowHeight * (numRows - 1);
      for (let col = 0; col < numCols; col++) {
        const tileWidth =
          col < numCols - 1 ? columnWidth : width - columnWidth * (numCols - 1);
        yield new Tile(
          col * columnWidth,
          row * rowHeight,
          tileWidth,
          tileHeight,
        );
      }
    }
  }
}

// 写経したけど使ってない
class WorkerPool {
  constructor(numWorkers, workerSource) {
    this.idleWorkers = [];
    this.workerQueue = [];
    this.workerMap = new Map();

    for (let i = 0; i < numWorkers; i++) {
      const worker = new Worker(workerSource);
      worker.onmessage = (message) => {
        this._workerDone(worker, null, message.data);
      };
      worker.onerror = (error) => {
        this._workerDone(worker, error, null);
      };
      this.idleWorkers[i] = worker;
    }
  }

  _workerDone(worker, error, response) {
    const [resolver, rejecter] = this.workerMap.get(worker);
    this.workerMap.delete(worker);

    if (this.workerQueue.length === 0) {
      this.idleWorkers.push(worker);
    } else {
      const [work, resolve, reject] = this.workerQueue.shift();
      this.workerMap.set(worker, [resolve, reject]);
      worker.postMessage(work);
    }

    error === null ? resolver(response) : rejecter(error);
  }

  addWork(work) {
    return new Promise((resolve, reject) => {
      if (this.idleWorkers.length > 0) {
        const worker = this.idleWorkers.pop();
        this.workerMap.set(worker, [resolve, reject]);
        worker.postMessage(work);
      } else {
        this.workerQueue.push([work, resolve, reject]);
      }
    });
  }
}

// 写経したけど使ってない
class PageState {
  static initState() {
    const s = new PageState();
    s.cx = -0.5;
    s.cy = 0;
    s.perPixel = 3 / window.innerHeight;
    s.maxIterations = 500;
    return s;
  }

  static fromURL(url) {
    const s = new PageState();
    const u = new URL(url);
    s.cx = parseFloat(u.searchParams.get("cx"));
    s.cy = parseFloat(u.searchParams.get("cy"));
    s.perPixel = parseFloat(u.searchParams.get("pp"));
    s.maxIterations = parseInt(u.searchParams.get("maxIterations"));
    return isNaN(s.cx) ||
      isNaN(s.cy) ||
      isNaN(s.perPixel) ||
      isNaN(s.maxIterations)
      ? null
      : s;
  }

  toURL() {
    const u = new URL(window.location);
    u.searchParams.set("cx", this.cx);
    u.searchParams.set("cy", this.cy);
    u.searchParams.set("pp", this.perPixel);
    u.searchParams.set("it", this.maxIterations);
    return u.href;
  }
}

// 写経したけど使ってない
const ROWS = 3,
  COLS = 4
  // NUMWORKERS = navigator.hardwareConcurrency || 2;

class SierpinskiCanvas {
  constructor(canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.worker = new Worker('./worker.js')
    this.setSize()

    // this.worker.postMessage({ x: 300, y: 300, size: 300, depth: 5 })
    this.worker.postMessage({
      height: this.canvas.height,
      width: this.canvas.width,
      size: 300,
      depth: 5,
    })
    this.worker.onmessage = (message) => {
      this.image = message.data
      this.render()
    }

    window.addEventListener('resize', () => {this.setSize()})
    this.render()
  }

  setSize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.worker.postMessage({
      height: this.canvas.height,
      width: this.canvas.width,
      size: 300,
      depth: 5,
    })
    this.render()
  }

  render() {
    if (!this.image) return 
    this.context.drawImage(this.image, 0, 0)
  }
}

const canvas = document.createElement('canvas')
canvas.width = 600
canvas.height = 600
new SierpinskiCanvas(canvas)

document.body.append(canvas)