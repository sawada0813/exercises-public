import { TypeMap } from "./index.js";

it("test", () => {
  const typeMap = new TypeMap();
  class Foo {}

  typeMap.set(String, "string");
  typeMap.set(Number, 123);
  typeMap.set(Foo, new Foo());
  expect(typeMap.set(Date, "not a date")).toBe(Error);
  expect(typeMap.get(String)).toBe("string");
  expect(typeMap.get(Number)).toBe(123);
});
