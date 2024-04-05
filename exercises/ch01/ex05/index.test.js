import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  describe("sum", () => {
    it("returns added value when two positive number", () => {
      expect(sum(1, 2)).toBe(3);
    });

    it("returns added value when positive number and negative number are given", () => {
      expect(sum(1, -2)).toBe(-1);
    });

    it("returns added value when two negative number given", () => {
      expect(sum(-1, -2)).toBe(-3);
    });
  });

  describe("factorial", () => {
    it("returns factorial value", () => {
      expect(factorial(5)).toBe(120);
    });

    it("returns given value when given negative number", () => {
      expect(factorial(-5)).toBe(-5);
    });

    it("returns zero when given zero", () => {
      expect(factorial(0)).toBe(0);
    });
  });
});
