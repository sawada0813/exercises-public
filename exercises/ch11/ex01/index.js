export class TypeMap {
  constructor() {
    this.map = new Map();
  }
  #isConstructor(func) {
    return (
      typeof func === "function" &&
      func.prototype.constructor === func
    );
  }
  set(key, value) {
    if (this.#isConstructor(key) && value.constructor === key) {
      this.map.set(key, value);
    } else {
      return Error;
    }
  }
  get(key) {
    return this.map.get(key);
  }
}
