const fs = require("fs");

function* readLines(filePath) {
  const bufferSize = 1024;
  const buffer = Buffer.alloc(bufferSize);
  let fd = undefined;
  let restStrings = "";

  try {
    fd = fs.openSync(filePath, "r");
    let bytesRead;
    while ((bytesRead = fs.readSync(fd, buffer, 0, bufferSize, null)) > 0) {
      const fullStrings = restStrings + buffer.toString("utf8", 0, bytesRead);
      const lines = fullStrings.split("\n");
      restStrings = lines.pop();

      for (const line of lines) {
        yield line;
      }
    }
    if (restStrings) {
      yield restStrings;
    }
  } finally {
    if (fd) {
      fs.closeSync(fd);
    }
  }
}

module.exports = readLines;
