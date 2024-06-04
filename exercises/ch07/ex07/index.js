export function sort(
  array,
  compare = (lhs, rhs) => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0),
) {
  // array[0 ... i-1] が常にソート済みになるように処理を進める
  // (0 <= j < i-1 に対して compare(array[j], array[j + 1]) <= 0 が成り立つ)
  for (let i = 1; i < array.length; i++) {
    const v = array[i];

    // array[i] を array[0 ... i] の適切な場所に挿入する
    let j = i;
    while (j > 0 && compare(array[j - 1], v) > 0) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = v;
  }
  return array;
}

// console.log(sort([4, 1, 3, 5, 2])); // [ 1, 2, 3, 4, 5 ]

// バブルーソート
export function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    // 最大値を右端に寄せる
    for (let j = 0; j < array.length - i - 1; j++) {
      // 左の要素の方が大きかったら位置を交換
      if (array[j + 1] < array[j]) {
        const lessValue = array[j + 1];
        array[j + 1] = array[j];
        array[j] = lessValue;
      }
    }
  }

  return array;
}

// console.log(bubbleSort([4, 1, 3, 5, 2])); // [ 1, 2, 3, 4, 5 ]
