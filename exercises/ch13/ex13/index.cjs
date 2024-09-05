const fs = require("fs");

function* walk(rootPath) {
  const files = fs.readdirSync(rootPath, {
    recursive: true,
    withFileTypes: true,
  });
  yield* files;
}

module.exports = walk;
