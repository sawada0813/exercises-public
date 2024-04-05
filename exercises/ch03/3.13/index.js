class Example {
  constructor(obj) {
    this.obj = obj;
  }
  valueOf() {
    return this.obj;
  }

  toString() {
    return String(Object.getPrototypeOf(this.obj));
  }
}

const obj = new Example({ a: 1, b: 2 });

console.log(obj.valueOf());
console.log(obj.toString());
