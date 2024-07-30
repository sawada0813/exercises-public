export class C {
  constructor() {
    this.i = 1;
  }
  static method() {
    return this.i ?? 1;
  }
  method() {
    return this.i + 1;
  }
  static C() {
    return new C();
  }
}
