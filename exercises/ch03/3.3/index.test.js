import { isSameNumber } from "./index";

describe("isSameNumber", () => {
  it("return true", () => {
    expect(isSameNumber(0.3 - 0.2, 0.1)).toBe(true);
    expect(isSameNumber(0.2 - 0.1, 0.1)).toBe(true);
  });
});
