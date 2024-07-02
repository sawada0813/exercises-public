import { repeatAndCollect, squared, generateNow } from "./index.js";

test.each([
  // 正常系
  { n: 1, c: "hoge", expected: ["hoge"] },
  { n: 2, c: "hoge", expected: ["hoge", "hoge"] },
  { n: 2, c: "a", expected: ["a", "a"] },
  { n: 2, c: "A", expected: ["A", "A"] },
  { n: 2, c: "1", expected: ["1", "1"] },
  {
    n: 2,
    c: "\u3053\u3093\u306b\u3061\u306f",
    expected: [
      "\u3053\u3093\u306b\u3061\u306f",
      "\u3053\u3093\u306b\u3061\u306f",
    ],
  },
  {
    n: 10,
    c: "hoge",
    expected: [
      "hoge",
      "hoge",
      "hoge",
      "hoge",
      "hoge",
      "hoge",
      "hoge",
      "hoge",
      "hoge",
      "hoge",
    ],
  },
  // 以下、異常系
  { n: 0, c: "hoge", expected: "args n is invalid" },
  { n: -1, c: "hoge", expected: "args n is invalid" },
  { n: 1.1, c: "hoge", expected: "args n is invalid" },
  { n: "fuga", c: "hoge", expected: "args n is invalid" },
  { n: 3, c: 100, expected: "args c is invalid type" },
])("$#: .repeatAndCollect($n, $c) = $expected", ({ n, c, expected }) => {
  try {
    expect(repeatAndCollect(n, c)).toEqual(expected);
  } catch (e) {
    expect(e).toEqual(expected);
  }
});

test.each([
  { x: 1, expected: 1 },
  { x: 2, expected: 4 },
  { x: -2, expected: 4 },
  { x: 0, expected: 0 },
  { x: "2", expected: 4 },
])("$#: .squared($x) = $expected", ({ x, expected }) => {
  expect(squared(x)).toEqual(expected);
});

it("generateNow", () => {
  expect("now" in generateNow()).toBe(true);
  expect(typeof generateNow()["now"]).toBe("number");
});
