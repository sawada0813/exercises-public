import fs from "fs";

export default function checkEntry(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject("error");
        return;
      }
      if (stats.isFile()) {
        resolve("file");
      } else if (stats.isDirectory()) {
        resolve("directory");
      } else {
        resolve("neither a file nor a directory");
      }
    });
  });
}
