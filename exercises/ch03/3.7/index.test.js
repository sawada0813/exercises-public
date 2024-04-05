import { equalArrays } from "./index";

describe("equalArrays", () => {
  it("return true", () => {
    expect(equalArrays(["a", "b", "c"], "abc")).toBe(true);
  });
});
