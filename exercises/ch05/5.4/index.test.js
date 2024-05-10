import { fibWithWhile, fibWithDoWhile, fibWithFor } from "./index";

describe("fib", () => {
  it("fibWithWhile", () => {
    expect(fibWithWhile()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
  it("fibWithDoWhile", () => {
    expect(fibWithDoWhile()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
  it("fibWithFor", () => {
    expect(fibWithFor()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
