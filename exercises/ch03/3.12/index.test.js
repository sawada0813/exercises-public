import { equals } from "./index";

test("equals", () => {
  const obj1 = { x: 1 };
  obj1.y = 2;
  const obj2 = { x: 1, y: 2 };

  expect(equals(obj1, obj2)).toBe(true);
});
