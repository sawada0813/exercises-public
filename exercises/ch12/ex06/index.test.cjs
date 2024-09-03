const fs = require('fs')
const walk = require('./index.cjs')


describe('walk', () => {
  const testFilePath = './ch12/ex06'
  const fixedFiles = [
    { path: testFilePath+"/index.cjs", isDirectory: false },
    { path: testFilePath+"/index.test.cjs", isDirectory: false },
  ]
  // pathでソートするための比較関数
  const compareFn = (a, b) => {
    if (a.path > b.path) {
      return -1
    }
    if (a.path < b.path) {
      return 1
    }
    return 0
  }

  test('return files at root directory', async () => {
    const addFiles = [{ path: testFilePath+'/foo.txt', isDirectory: false }]
    const expectedFiles = fixedFiles.concat(addFiles)
    addFiles.forEach((file) => {
      fs.writeFileSync(file.path, '')
    })
    expect.assertions(2)
    const dirent = walk(testFilePath)
    const files = []
    for (let i = 0; i < expectedFiles.length; i++) {
      files.push(dirent.next().value)
    }
    expect(files.sort(compareFn)).toEqual(expectedFiles.sort(compareFn))
    expect(dirent.next().done).toBe(true)
    addFiles.forEach(async (file) => {
      fs.rmSync(file.path)
    })
    })

  test('return directory at root directory', async () => {
    const addFiles = [{ path: testFilePath + '/foo', isDirectory: true }]
    const expectedFiles = fixedFiles.concat(addFiles)
    addFiles.forEach(async (file) => {
      if (file.isDirectory) {
        fs.mkdirSync(file.path)
      } else {
        fs.writeFileSync(file.path, '')
      }
    })
    expect.assertions(2)
    const dirent = walk(testFilePath)
    const files = []
    for (let i = 0; i < expectedFiles.length; i++) {
      files.push(dirent.next().value)
    }
    expect(files.sort(compareFn)).toEqual(expectedFiles.sort(compareFn))
    expect(dirent.next().done).toBe(true)
    addFiles.forEach((file) => {
      if (file.isDirectory) {
        fs.rmdirSync(file.path)
      } else {
        fs.rmSync(file.path)
      }
    })
  })

  test('return file from very deep directory', () => {
    const addFiles = [
      { path: testFilePath + '/foo'.repeat(1), isDirectory: true },
      { path: testFilePath + '/foo'.repeat(2), isDirectory: true },
      { path: testFilePath + '/foo'.repeat(3), isDirectory: true },
      { path: testFilePath + '/foo'.repeat(4), isDirectory: true },
      { path: testFilePath + '/foo'.repeat(5), isDirectory: true },
      { path: testFilePath + '/foo'.repeat(5)+'/foo.txt', isDirectory: false },
    ]
    const expectedFiles = fixedFiles.concat(addFiles)
    addFiles.forEach(async (file) => {
      if (file.isDirectory) {
        fs.mkdirSync(file.path)
      } else {
        fs.writeFileSync(file.path, '')
      }
    })
    expect.assertions(2)
    const dirent = walk(testFilePath)
    const files = []
    for (let i = 0; i < expectedFiles.length; i++) {
      files.push(dirent.next().value)
    }
    expect(files.sort(compareFn)).toEqual(expectedFiles.sort(compareFn))
    expect(dirent.next().done).toBe(true)
    addFiles.sort(compareFn).forEach((file) => {
      if (file.isDirectory) {
        fs.rmdirSync(file.path)
      } else {
        fs.rmSync(file.path)
      }
    })
  })
})
