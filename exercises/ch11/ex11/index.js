// N 回何もしないループの時間を返す
function costOfLoop(N) {
  const start = performance.now();
  for (let i = 0; i < N; i++) {}
  const end = performance.now();
  console.log("constOfLoop: ", end - start);
  return end - start;
}

// N 回 "Hello".length を実行 + N 回何もしないループの時間を返す
function costOfLengthPlusLoop(N) {
  const str = "Hello";
  let res = 0;
  const start = performance.now();
  for (let i = 0; i < N; i++) {
    res = str.length;
  }
  const end = performance.now();

  if (res !== 5) {
    throw new Error("something is wrong");
  }
  console.log("costOfLengthPlusLoop: ", end - start);
  return end - start;
}

// "Hello".length 1回あたりの時間を返す
function costOfLength(N) {
  const lhs = costOfLengthPlusLoop(N);
  const rhs = costOfLoop(N);
  console.log("lhs: ", lhs);
  console.log("rhs: ", rhs);
  // ここでrhsの方が大きな値になることがある
  return (lhs - rhs) / N;
}

// 以下を変更して実験しなさい
console.log(costOfLength(10));
console.log(costOfLength(100));
console.log(costOfLength(1000));
console.log(costOfLength(10000)); // これだけrhsの方が大きくなる
console.log(costOfLength(100000)); // ここもたまにrhsの方が大きくなる
console.log(costOfLength(1000000));
console.log(costOfLength(10000000));

// 考察
// JavaScriptはJITコンパイラを持っているため、コードの実行が進むにつれて最適化される
// そのため、最初の方はあまり最適化されていないコードを実行しているため、遅くなり後半では最適化されたコードを実行しているため速くなる
// あとはタイマーの精度の問題でばらつきが生じている可能性がある
