import { sortJapanese, toJapaneseDateString } from "./index.js";

test("sortJapanese", () => {
  const tests = [
    {
      input: ["は", "ば", "ぱ", "つ", "っ"],
      expected: ["つ", "っ", "は", "ば", "ぱ"],
    },
    {
      input: ["お", "え", "う", "い", "あ"],
      expected: ["あ", "い", "う", "え", "お"],
    },
    { input: ["い", "", "あ"], expected: ["", "あ", "い"] },
  ];
  tests.forEach(({ input, expected }) => {
    expect(sortJapanese(input)).toEqual(expected);
  });
});

test("toJapaneseDateString", () => {
  // 元号が日付のテスト
  const tests = [
    {
      input: new Date("2019-5-1"),
      expected: "令和元年5月1日",
    },
    {
      input: new Date("2019-4-30"),
      expected: "平成31年4月30日",
    },
    {
      input: new Date("1989-1-8"),
      expected: "平成元年1月8日",
    },
    {
      input: new Date("1988-1-7"),
      expected: "昭和63年1月7日",
    },
    {
      input: new Date("1926-12-25"),
      expected: "昭和元年12月25日",
    },
  ];
  tests.forEach(({ input, expected }) => {
    expect(toJapaneseDateString(input)).toEqual(expected);
  });
});
