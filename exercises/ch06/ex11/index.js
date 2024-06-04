export const object = {
  r: 0,
  theta: 0, // ラジアン
  x: 0,
  y: 0,
  get getX() {
    return this.y;
  },
  set setX(value) {
    if (isNaN(value)) {
      throw "NaN is not assignable";
    }

    this.x = value;
    this.r = Math.sqrt(this.x ** 2 + this.y ** 2);
    this.theta = Math.acos(this.x / this.r);
  },
  get getY() {
    return this.y;
  },
  set setY(value) {
    if (isNaN(value)) {
      throw "NaN is not assignable";
    }
    this.y = value;
    this.r = Math.sqrt(this.x ** 2 + this.y ** 2);
    this.theta = Math.asin(this.y / this.r);
  },
};
