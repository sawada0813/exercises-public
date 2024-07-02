import { any } from "./index.js";

it("any", () => {
  const isNonZero = any(
    (n) => n > 0,
    (n) => n < 0,
  );
  expect(isNonZero(0)).toBe(false);
  expect(isNonZero(42)).toBe(true);
  expect(isNonZero(-0.5)).toBe(true);
});
