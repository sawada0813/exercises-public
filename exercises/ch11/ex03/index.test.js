import { convertToBigEndian, convertToLittleEndian } from "./index.js";

// 実行環境がリトルインディアンのシステム
// new Int8Array(new Int32Array([1]).buffer)[0] === 1 → true
describe("convert", () => {
  it("convertToBigEndian", () => {
    const array = new Uint32Array([0x01020304, 0x05060708]);
    const expected = new Uint32Array([0x04030201, 0x08070605]);
    expect(convertToBigEndian(array)).toEqual(expected);
  });
  it("convertToLittleEndian", () => {
    // 最初にビッグインディアンに変換する
    const array = convertToBigEndian(new Uint32Array([0x01020304, 0x05060708]));
    const expected = new Uint32Array([0x04030201, 0x08070605]);
    expect(convertToLittleEndian(array)).toEqual(expected);
  });
});
