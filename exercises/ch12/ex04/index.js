export function* seiveOfEratosthenes() {
  const numbers = [];
  // 最初の素数は2なので、2を返す
  let i = 2;
  while (true) {
    // 次のiがnumbersのいずれかの数で割り切れる場合は
    // 次のiを返さずにiをインクリメントする
    if (!numbers.some((n) => i % n === 0)) {
      numbers.push(i);
      yield i;
    }
    i++;
  }
}
// エラトステネスの篩ではないかも？
// 指定された整数x以下の全ての素数を発見するアルゴリズムなので
// xがない無限ジェネレータは実装できないはず？
