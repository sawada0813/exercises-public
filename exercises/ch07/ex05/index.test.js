import { pop, push, shift, unshift, sort } from "./index.js";

// console.log(pop(seq)) // [1, 2, 3, 4]
// console.log(push(seq, 6)) // [1, 2, 3, 4, 5, 6]
// console.log(shift(seq)) // [2, 3, 4, 5]
// console.log(unshift(seq, 0)) // [0, 1, 2, 3, 4, 5]
// console.log(sort(seq, (a, b) => b - a)) // [5, 4, 3, 2, 1]

// // 元の配列は変更されていない
// console.log(seq) // [1, 2, 3, 4, 5]

describe("破壊的ではないメソッドのテスト", () => {
  it("pop", () => {
    const seq = [1, 2, 3, 4, 5];
    const expectedSeq = seq.concat();
    const expectedResult = [1, 2, 3, 4];
    expect(pop(seq)).toStrictEqual(expectedResult);
    expect(seq).toStrictEqual(expectedSeq);
  });
  it("push", () => {
    const seq = [1, 2, 3, 4, 5];
    const expectedSeq = seq.concat();
    const expectedResult = [1, 2, 3, 4, 5, 6];
    expect(push(seq, 6)).toStrictEqual(expectedResult);
    expect(seq).toStrictEqual(expectedSeq);
  });
  it("shift", () => {
    const seq = [1, 2, 3, 4, 5];
    const expectedSeq = seq.concat();
    const expectedResult = [2, 3, 4, 5];
    expect(shift(seq)).toStrictEqual(expectedResult);
    expect(seq).toStrictEqual(expectedSeq);
  });
  it("unshift", () => {
    const seq = [1, 2, 3, 4, 5];
    const expectedSeq = seq.concat();
    const expectedResult = [0, 1, 2, 3, 4, 5];
    expect(unshift(seq, 0)).toStrictEqual(expectedResult);
    expect(seq).toStrictEqual(expectedSeq);
  });
  it("sort", () => {
    const seq = [1, 2, 3, 4, 5];
    const expectedSeq = seq.concat();
    const expectedResult = [5, 4, 3, 2, 1];
    expect(sort(seq, (a, b) => b - a)).toStrictEqual(expectedResult);
    expect(seq).toStrictEqual(expectedSeq);
  });
});
