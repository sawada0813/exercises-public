import { counterGen } from "./index.js";

describe("counterGen", () => {
  test("increment", () => {
    const counter = counterGen();
    for (let i = 0; i < 3; i++) {
      expect(counter.next().value).toBe(i);
    }
  });
  test("reset", () => {
    const counter = counterGen();
    // ここでthrowするとバグる
    for (let i = 0; i < 3; i++) {
      expect(counter.next().value).toBe(i);
    }
    counter.throw();
    for (let i = 0; i < 3; i++) {
      expect(counter.next().value).toBe(i);
    }
  });
});
