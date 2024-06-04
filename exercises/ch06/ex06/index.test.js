import { extractOriginalProperty } from "./index.js";

it("extractOriginalProperty", () => {
  const object01 = {
    prototypeNumberProperty: 42,
    originalStringProperty: "hoge",
    originalSymbolProperty: Symbol(),
  };

  const object02 = Object.create(object01);
  object02.originalNumberProperty = 100;
  object02.originalStringProperty = "hoge";
  object02.originalSymbolProperty = Symbol();

  const expectedResult = [
    "originalNumberProperty",
    "originalStringProperty",
    "originalSymbolProperty",
  ];

  expect(extractOriginalProperty(object02)).toStrictEqual(expectedResult);
});
