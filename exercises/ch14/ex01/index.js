// 書き込み不可のプロパティを持つオブジェクト
const nestedUnwritableObj = Object.freeze({
  a: 1
})


const unwritableAndUnconfigurableObj = {}
const writableAndUnconfigurableObj = {}

export { nestedUnwritableObj, unwritableAndUnconfigurableObj, writableAndUnconfigurableObj }