const fs = require('fs');

function* walk(rootPath) {
  const files = fs.readdirSync(rootPath, { recursive: true, withFileTypes: true })
  for (const file of files) {
    let path = ''
    path += file.path.includes('./') ? '' : './'
    path += `${file.path}/${file.name}` 
    yield { path, isDirectory: file.isDirectory() };
  }
}

module.exports = walk