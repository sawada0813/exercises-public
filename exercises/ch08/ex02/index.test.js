import { squared } from "./index.js";

test.each([
  { x: 1, n: 2, expected: 1 },
  { x: 2, n: 3, expected: 8 },
  { x: 3, n: 3, expected: 27 },
])("$#: .squared($x,$n) = $expected", ({ x, n, expected }) => {
  expect(squared(x, n)).toEqual(expected);
});
