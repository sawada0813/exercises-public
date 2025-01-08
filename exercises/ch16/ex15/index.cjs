const threads = require("worker_threads");

if (threads.isMainThread) {
  let num = 0;
  let worker = new threads.Worker(__filename, { workerData: num });

  worker.on("online", () => {
    for (let i = 0; i < 10_000_000; i++) {
      num++;
    }

    worker.on("message", (message) => {
      if (message === "num をインクリメントせよ") {
        num++;
      } else if (message === "done") {
        console.log(num);
      }
    });
  });
} else {
  let num = threads.workerData;
  for (let i = 0; i < 10_000_000; i++) {
    threads.parentPort.postMessage("num をインクリメントせよ");
  }
  threads.parentPort.on("message", (message) => {
    console.log(message);
  });
  threads.parentPort.postMessage("done");
}

// Q. このようないわゆるメッセージパッシングによって排他制御処理相当を行う並行処理モデルを何と呼ぶか書きなさい
// A. アクターモデル
