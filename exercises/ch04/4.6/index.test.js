import { resize, resize1, resize2 } from "./index";

describe("resize", () => {
  it("resize", () => {
    expect(resize({ maxWidth: 100, maxHeight: 100 })).toStrictEqual({
      maxWidth: 100,
      maxHeight: 100,
    });
    expect(resize({ maxWidth: 100 })).toStrictEqual({
      maxWidth: 100,
      maxHeight: 480,
    });
    expect(resize({ maxHeight: 100 })).toStrictEqual({
      maxWidth: 600,
      maxHeight: 100,
    });
    expect(resize()).toStrictEqual({
      maxWidth: 600,
      maxHeight: 480,
    });
    expect(resize({ maxWidth: null, maxHeight: null })).toStrictEqual({
      maxWidth: 600,
      maxHeight: 480,
    });
  });
  it("resize1", () => {
    expect(resize1({ maxWidth: 100, maxHeight: 100 })).toStrictEqual({
      maxWidth: 100,
      maxHeight: 100,
    });
    expect(resize1({ maxWidth: 100 })).toStrictEqual({
      maxWidth: 100,
      maxHeight: 480,
    });
    expect(resize1({ maxHeight: 100 })).toStrictEqual({
      maxWidth: 600,
      maxHeight: 100,
    });
    expect(resize1()).toStrictEqual({
      maxWidth: 600,
      maxHeight: 480,
    });
    expect(resize1({ maxWidth: null, maxHeight: null })).toStrictEqual({
      maxWidth: 600,
      maxHeight: 480,
    });
  });
  it("resize2", () => {
    expect(resize2({ maxWidth: 100, maxHeight: 100 })).toStrictEqual({
      maxWidth: 100,
      maxHeight: 100,
    });
    expect(resize2({ maxWidth: 100 })).toStrictEqual({
      maxWidth: 100,
      maxHeight: 480,
    });
    expect(resize2({ maxHeight: 100 })).toStrictEqual({
      maxWidth: 600,
      maxHeight: 100,
    });
    expect(resize2()).toStrictEqual({
      maxWidth: 600,
      maxHeight: 480,
    });
    expect(resize2({ maxWidth: null, maxHeight: null })).toStrictEqual({
      maxWidth: 600,
      maxHeight: 480,
    });
  });
});
