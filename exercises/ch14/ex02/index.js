export class MyArrayLike {
  // 参照 https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/Symbol.species
  constructor(length) {
    this.length = length
  }
}

export class MyArray extends Array {
  constructor(items) {
    super(...items)
  }

  static get [Symbol.species]() {
    return MyArrayLike
  }
}
