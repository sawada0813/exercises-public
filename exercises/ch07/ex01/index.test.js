import { add, mul } from "./index.js";

describe("行列の演算", () => {
  test.each([
    {
      array1: [
        [1, 2],
        [1, 2],
      ],
      array2: [
        [1, 2],
        [1, 2],
      ],
      expected: [
        [2, 4],
        [2, 4],
      ],
    },
    {
      array1: [
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
      ],
      array2: [
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
      ],
      expected: [
        [2, 4, 6],
        [2, 4, 6],
        [2, 4, 6],
      ],
    },
  ])(
    "$#: target,template,expected = {$array1, $array2, $expected}",
    ({ array1, array2, expected }) => {
      const result = add(array1, array2);
      expect(result).toEqual(expected);
    },
  );
  test.each([
    {
      array1: [
        [1, 2],
        [3, 4],
      ],
      array2: [[5], [6]],
      expected: [[17], [39]],
    },
    {
      array1: [
        [1, 2],
        [3, 4],
      ],
      array2: [
        [1, 3],
        [2, 4],
      ],
      expected: [
        [5, 11],
        [11, 25],
      ],
    },
    {
      array1: [
        [1, 5],
        [1, 1],
        [4, 4],
      ],
      array2: [
        [8, 1, 0],
        [3, 1, 5],
      ],
      expected: [
        [23, 6, 25],
        [11, 2, 5],
        [44, 8, 20],
      ],
    },
  ])(
    "$#: target,template,expected = {$array1, $array2, $expected}",
    ({ array1, array2, expected }) => {
      const result = mul(array1, array2);
      expect(result).toEqual(expected);
    },
  );
});
