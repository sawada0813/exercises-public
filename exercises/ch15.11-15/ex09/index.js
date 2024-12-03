// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// grid を canvas に描画する
function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const ws = new WebSocket("ws://localhost:3003");

  ws.addEventListener("open", () => {
    console.log("connected");

    // https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
    let animationId = null;

    // NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
    const sound = new Audio("/ch15.04-10/ex10/decision1.mp3");

    // ライフゲームのセル (true or false) をランダムに初期化する
    const grid = new Array(ROWS)
      .fill(null)
      .map(() =>
        new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)),
      );

    // canvas がクリックされたときの処理 (セルの値を反転する)
    canvas.addEventListener("click", function (evt) {
      const rect = canvas.getBoundingClientRect();
      const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

      const row = Math.floor(pos.y / RESOLUTION);
      const col = Math.floor(pos.x / RESOLUTION);
      grid[row][col] = !grid[row][col];
      sound.cloneNode().play();
      renderGrid(grid);

      ws.send(JSON.stringify({ type: "toggle", row: row, col: col }));
    });

    // requestAnimationFrame によって一定間隔で更新・描画を行う
    // NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)
    // https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
    function update() {
      animationId = requestAnimationFrame(update);
    }

    startButton.addEventListener("click", () => {
      // 既にアニメーションが動いている場合は何もしない
      if (animationId) {
        return;
      }

      ws.send(JSON.stringify({ type: "start" }));
      update();
    });

    pauseButton.addEventListener("click", () => {
      // アニメーションが停止している場合は何もしない
      if (!animationId) {
        return;
      }
      ws.send(JSON.stringify({ type: "pause" }));
      cancelAnimationFrame(animationId);
      animationId = null;
    });
  });

  ws.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case "update":
        renderGrid(data.grid);
        break;
      case "pause":
        cancelAnimationFrame(animationId);
        animationId = null;
        break;
      case "start":
        update();
        break;
    }
  });
});
