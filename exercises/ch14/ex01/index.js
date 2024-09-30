const unwritableAndUnconfigurableObj = () => {
  return Object.freeze({
    a: 1,
  })
}

const writableAndUnconfigurableObj = () => {
  return Object.defineProperty({ b: 2 }, 'b', {
    writable: true,
    configurable: false,
  })
}

const nestedUnwritableObj = () => {
  // 各階層でfreezeする
  return Object.freeze({ c: Object.freeze({ d: Object.freeze({ e: 3 }) }) })
}

export { nestedUnwritableObj, unwritableAndUnconfigurableObj, writableAndUnconfigurableObj }