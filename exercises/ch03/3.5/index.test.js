import { convertLFtoCRLF, convertCRLFtoLF } from "./index";

describe("convert", () => {
  it("LF -> CR+LF", () => {
    expect(convertLFtoCRLF(`aa\naa`)).toBe(`aa\r\naa`);
  });
  it("CR+LF -> LF", () => {
    expect(convertCRLFtoLF(`aa\r\naa`)).toBe(`aa\naa`);
  });
});
