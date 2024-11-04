import Hiragana from "./index.js";

describe("Hiragana", () => {
  test("simple compare", () => {
    const hiragana1 = new Hiragana("あ");
    const hiragana2 = new Hiragana("い");
    const hiragana3 = new Hiragana("う");
    expect(hiragana1 < hiragana2).toBe(true);
    expect(hiragana2 < hiragana3).toBe(true);
    expect(hiragana1 < hiragana3).toBe(true);
    expect(hiragana2 < hiragana1).toBe(false);
    expect(hiragana3 < hiragana2).toBe(false);
    expect(hiragana3 < hiragana1).toBe(false);
    expect(hiragana1 == hiragana1).toBe(true);
    expect(hiragana2 == hiragana2).toBe(true);
    expect(hiragana3 == hiragana3).toBe(true);
  });
  test("sort", () => {
    const hiragana1 = new Hiragana("あ");
    const hiragana2 = new Hiragana("い");
    const hiragana3 = new Hiragana("う");
    expect([hiragana2, hiragana1, hiragana3].sort()).toStrictEqual([
      hiragana1,
      hiragana2,
      hiragana3,
    ]);
  });
  test("string test", () => {
    const hiragana1 = new Hiragana("あ");
    const hiragana2 = new Hiragana("い");
    const hiragana3 = new Hiragana("う");
    expect(hiragana1 + hiragana2 + hiragana3).toBe("あいう");
  });
});
