import { deleteOdd } from "./index";

describe("deleteOdd", () => {
  it("Odd and even", () => {
    expect(deleteOdd({ a: 1, b: 2 })).toStrictEqual({ b: 2 });
    expect(deleteOdd({ a: 1, b: 2, c: 3 })).toStrictEqual({ b: 2 });
    expect(deleteOdd({ a: 1, b: 2, c: 3, d: 4 })).toStrictEqual({ b: 2, d: 4 });
  });
  it("Odd only", () => {
    expect(deleteOdd({ a: 1, b: 3 })).toStrictEqual({});
    expect(deleteOdd({ a: 1, b: 3, c: 5 })).toStrictEqual({});
  });
  it("Even only", () => {
    expect(deleteOdd({ a: 2, b: 4 })).toStrictEqual({ a: 2, b: 4 });
    expect(deleteOdd({ a: 2, b: 4, c: 6 })).toStrictEqual({ a: 2, b: 4, c: 6 });
  });
  it("given string", () => {
    expect(deleteOdd({ a: "one", b: "two" })).toStrictEqual({});
    expect(deleteOdd({ a: "one", b: "two", c: 2 })).toStrictEqual({ c: 2 });
  });
});
