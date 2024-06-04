import { selfMadeAssign } from "./index.js";

describe("selfMadeAssign", () => {
  it("上書きする", () => {
    const target = { x: 1 };
    const source = { x: 4, y: 2, z: 3 };
    const args = [target, source];
    const expectedResult = Object.assign(...args);
    const selfMadeResult = selfMadeAssign(...args);
    expect(expectedResult === selfMadeResult).toBe(true);
  });
  it("上書きしたくない", () => {
    const target = { x: 1 };
    const source = { x: 4, y: 2, z: 3 };
    const args = [{}, source, target];
    const expectedResult = Object.assign(...args);
    const selfMadeResult = selfMadeAssign(...args);
    expect(expectedResult === selfMadeResult).toBe(true);
  });
});
