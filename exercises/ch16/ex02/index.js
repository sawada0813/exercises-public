import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く
process.on("SIGINT", () => {
  console.log("Received SIGINT. Sending SIGINT to child process...");
  child.kill("SIGINT");
  child.on("close", () => {
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("Receive SIGTERM. Sending SIGTERM to child process...");
  child.kill("SIGTERM");
  child.on("close", () => {
    process.exit(0);
  });
});

while (true) {
  const [code, signal] = await startChild();
  if (code === 0) {
    console.log("Child process exited normally.");
    break;
  }
  console.log(`Child process exited with code ${code}. Restarting...`);
}
