import {
  o,
  p,
  q,
  createFromObject,
  createFromArray,
  createFromDate,
  createFromMap,
} from "./index.js";

describe("継承オブジェクトのテスト", () => {
  it("Object", () => {
    expect(o.isPrototypeOf(p)).toBe(true);
    expect(o.isPrototypeOf(q)).toBe(true);
    expect(p.isPrototypeOf(q)).toBe(true);
  });
  it("Object", () => {
    expect(Object.isPrototypeOf(createFromObject)).toBe(true);
  });
  it("Array", () => {
    expect(Array.isPrototypeOf(createFromArray)).toBe(true);
  });
  it("Date", () => {
    expect(Date.isPrototypeOf(createFromDate)).toBe(true);
  });
  it("Map", () => {
    expect(Map.isPrototypeOf(createFromMap)).toBe(true);
  });
});
