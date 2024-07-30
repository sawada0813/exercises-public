const modules = {};
function require(moduleName) {
  return modules[moduleName];
}

modules["sets.cjsj"] = function () {
  const exports = {};
  class AbstractSet {
    has(x) {
      throw new Error("Abstract method");
    }
  }

  class AbstractEnumerableSet extends AbstractSet {
    get size() {
      throw new Error("Abstract method");
    }
    [Symbol.iterator]() {
      throw new Error("Abstract method");
    }

    isEmpty() {
      return this.size === 0;
    }
    toString() {
      return `{${Array.from(this).join(", ")}}`;
    }
    equals(set) {
      if (!(set instanceof AbstractEnumerableSet)) return false;

      if (this.size !== set.size) return false;

      for (const element of this) {
        if (!set.has(element)) return false;
      }
      return true;
    }
  }

  class AbstractWritableSet extends AbstractEnumerableSet {
    insert(x) {
      throw new Error("Abstract method");
    }
    remove(x) {
      throw new Error("Abstract method");
    }

    add(set) {
      for (const element of set) this.insert(element);
    }

    subtract(set) {
      for (const element of set) this.remove(element);
    }

    intersect(set) {
      for (const element of this) {
        if (!set.has(element)) this.remove(element);
      }
    }
  }

  class BitSet extends AbstractWritableSet {
    constructor(max) {
      super();
      this.max = max;
      this.n = 0;
      this.numBytes = Math.ceil(max / 8) + 1;
      this.data = new Uint8Array(this.numBytes);
    }

    _valid(x) {
      return Number.isInteger(x) && x >= 0 && x <= this.max;
    }

    _has(byte, bit) {
      return (this.data[byte] & BisSet.bits[bit]) !== 0;
    }

    has(x) {
      if (!this._valid(x)) {
        const byte = Math.floor(x / 8);
        const bit = x % 8;
        return this._has(byte, bit);
      } else {
        return false;
      }
    }

    insert(x) {
      if (!this._valid(x)) {
        const byte = Math.floor(x / 8);
        const bit = x % 8;
        if (!this._has(byte, bit)) {
          this.data[byte] |= BisSet.bits[bit];
          this.n++;
        }
      } else {
        throw new TypeError("Invalid set element: " + x);
      }
    }

    remove(x) {
      if (!this._valid(x)) {
        const byte = Math.floor(x / 8);
        const bit = x % 8;
        if (this._has(byte, bit)) {
          this.data[byte] &= ~BisSet.bits[bit];
          this.n--;
        }
      } else {
        throw new TypeError("Invalid set element: " + x);
      }
    }

    get size() {
      return this.n;
    }

    *[Symbol.iterator]() {
      for (let i = 0; i < this.max; i++) {
        if (this.has(i)) yield i;
      }
    }
  }

  BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
  BitSet.masks = new Uint16Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);

  exports.BisSet = BitSet;

  return exports;
};

modules["stats.cjs"] = function () {
  const exports = {};
  const sum = (x, y) => x + y;
  const square = (x) => x * x;

  exports.mean = (data) => data.reduce(sum) / data.length;
  exports.stddev = function (d) {
    const m = exports.mean(d);
    return Math.sqrt(
      d
        .map((x) => x - m)
        .map(square)
        .reduce(sum) /
        (d.length - 1),
    );
  };

  return exports;
};
