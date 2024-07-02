class C {
  #x = 42;

  getX() {
    return this.#x;
  }
}

const c = new C();
console.log(c.x); // undefined
console.log(c.getX()); // 42

class C2 {
  getX() {
    let x = 42;
    return (function () {
      return x;
    })();
  }
}

const c2 = new C2();
console.log(c2.x); // undefined
console.log(c2.getX()); // 42
