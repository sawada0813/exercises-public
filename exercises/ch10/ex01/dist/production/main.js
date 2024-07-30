(() => {
  var t = {
      800: (t, r) => {
        class s {
          has(t) {
            throw new Error("Abstract method");
          }
        }
        class e extends s {
          get size() {
            throw new Error("Abstract method");
          }
          [Symbol.iterator]() {
            throw new Error("Abstract method");
          }
          isEmpty() {
            return 0 === this.size;
          }
          toString() {
            return `{${Array.from(this).join(", ")}}`;
          }
          equals(t) {
            if (!(t instanceof e)) return !1;
            if (this.size !== t.size) return !1;
            for (const r of this) if (!t.has(r)) return !1;
            return !0;
          }
        }
        Symbol.iterator;
        class n extends e {
          insert(t) {
            throw new Error("Abstract method");
          }
          remove(t) {
            throw new Error("Abstract method");
          }
          add(t) {
            for (const r of t) this.insert(r);
          }
          subtract(t) {
            for (const r of t) this.remove(r);
          }
          intersect(t) {
            for (const r of this) t.has(r) || this.remove(r);
          }
        }
        class o extends n {
          constructor(t) {
            super(),
              (this.max = t),
              (this.n = 0),
              (this.numBytes = Math.floor(t / 8) + 1),
              (this.data = new Uint8Array(this.numBytes));
          }
          _valid(t) {
            return Number.isInteger(t) && t >= 0 && t <= this.max;
          }
          _has(t, r) {
            return !!(this.data[t] & o.bits[r]);
          }
          has(t) {
            if (this._valid(t)) {
              const r = Math.floor(t / 8),
                s = t % 8;
              return this._has(r, s);
            }
            return !1;
          }
          insert(t) {
            if (!this._valid(t))
              throw new TypeError("Invalid set element: " + t);
            {
              const r = Math.floor(t / 8),
                s = t % 8;
              this._has(r, s) || ((this.data[r] |= o.bits[s]), this.n++);
            }
          }
          remove(t) {
            if (!this._valid(t))
              throw new TypeError("Invalid set element: " + t);
            {
              const r = Math.floor(t / 8),
                s = t % 8;
              this._has(r, s) && ((this.data[r] &= ~o.bits[s]), this.n--);
            }
          }
          get size() {
            return this.n;
          }
          *[Symbol.iterator]() {
            for (let t = 0; t < this.max; t++) this.has(t) && (yield t);
          }
        }
        (o.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128])),
          (o.masks = new Uint16Array([-2, -3, -5, -9, -17, -33, -65, -129])),
          (r.B = o);
      },
      724: (t, r) => {
        const s = (t, r) => t + r,
          e = (t) => t * t;
        (r.mean = (t) => t.reduce(s) / t.length),
          (r.stddev = function (t) {
            const n = r.mean(t);
            return Math.sqrt(
              t
                .map((t) => t - n)
                .map(e)
                .reduce(s) /
                (t.length - 1),
            );
          });
      },
    },
    r = {};
  function s(e) {
    var n = r[e];
    if (void 0 !== n) return n.exports;
    var o = (r[e] = { exports: {} });
    return t[e](o, o.exports, s), o.exports;
  }
  const e = s(724),
    n = new (0, s(800).B)(100);
  n.insert(10), n.insert(20), n.insert(30);
  const o = e.mean([...n]);
  console.log(o);
})();
