import { instanceOf } from "./index.js";

it("多段に継承したクラスのインスタンスと基底クラスのコンストラクタを入力する", () => {
  class A {}
  class B extends A {}
  class C extends B {}
  const c = new C();
  expect(instanceOf(c, C)).toBe(true);
  expect(instanceOf(c, B)).toBe(true);
  expect(instanceOf(c, A)).toBe(true);
});
it("継承関係にないインスタンスとクラスのコンストラクタを入力する", () => {
  class A {}
  class B {}
  const a = new A();
  expect(instanceOf(a, B)).toBe(false);
});
