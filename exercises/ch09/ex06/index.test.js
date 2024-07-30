import { TypedMap } from "./index.js";

describe("TypedMap", () => {
  it("get", () => {
    const typedMap = new TypedMap("string", "number", [
      ["a", 1],
      ["b", 2],
    ]);
    expect(typedMap.get("a")).toBe(1);
    expect(typedMap.get("b")).toBe(2);
  });
  it("set", () => {
    const typedMap = new TypedMap("string", "number", [
      ["a", 1],
      ["b", 2],
    ]);
    typedMap.set("c", 3);
    expect(typedMap.get("a")).toBe(1);
    expect(typedMap.get("b")).toBe(2);
    expect(typedMap.get("c")).toBe(3);
  });
  it("invalid key type when initialize", () => {
    expect(() => {
      new TypedMap("string", "number", [[1, 1]]);
    }).toThrow(TypeError);
  });
  it("invalid value type when initialize", () => {
    expect(() => {
      new TypedMap("string", "number", [["a", "1"]]);
    }).toThrow(TypeError);
  });
  it("invalid key type when set", () => {
    const typedMap = new TypedMap("string", "number");
    expect(() => {
      typedMap.set(1, 1);
    }).toThrow(TypeError);
  });
  it("invalid value type when set", () => {
    const typedMap = new TypedMap("string", "number");
    expect(() => {
      typedMap.set("a", "1");
    }).toThrow(TypeError);
  });
});
