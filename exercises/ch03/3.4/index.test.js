import { getLength } from "./index";

describe("getLength", () => {
  it("Hundred Points Symbol", () => {
    expect(getLength("💯")).toBe("\u{1F4AF}".length);
    expect("\uD83D\uDCAF").toBe("\u{0001F4AF}");
  });
});
