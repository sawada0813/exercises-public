import { sequenceToObject } from "./index.js";

test.each([
  // 正常系
  { args: ["a", 1, "b", 2], expected: { a: 1, b: 2 } },
  { args: ["a", 1, "b", 2, `\u0063`, 3], expected: { a: 1, b: 2, c: 3 } },
  // 以下、異常系
  { args: ["a", 1, "b", 2, 3], expected: "args length must be even number" },
  { args: [0, 1, "b", 2], expected: "odd number element must be string" },
])("$#: .squared($args) = $expected", ({ args, expected }) => {
  try {
    expect(sequenceToObject(...args)).toEqual(expected);
  } catch (e) {
    expect(e).toBe(expected);
  }
});
