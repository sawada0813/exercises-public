import { sort, bubbleSort } from "./index.js";

it("バブルソート", () => {
  const array = [4, 1, 3, 5, 2];
  expect(bubbleSort(array)).toBe(sort(array));
});

// バブルソートの計算量
// O(n^2)
// n(n-1)/2回の比較が行われる
// 一番大きい項以外と定数倍の違いは無視した
