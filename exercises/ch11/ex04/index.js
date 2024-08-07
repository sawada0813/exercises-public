// これから (N, K) と (K, M) の行列の乗算を行う (この値は色々変更して試すこと)
// TODO(sawada): 色々な値でためしてみる
// const [N, K, M] = [1000, 1, 1000];
// const [N, K, M] = [100, 1000, 100];
// const [N, K, M] = [100, 200, 300];
const [N, K, M] = [1, 2, 3];
// const [N, K, M] = [10, 20, 30];

// 配列版: (N, K) の行列を要素数 N * K の1次元配列で表現する ((i, j) は array[K * i + j] で参照)
const lhsA = Array(N * K)
  .fill(0.0)
  .map(() => Math.random());
const rhsA = Array(K * M)
  .fill(0.0)
  .map(() => Math.random());
const resultA = Array(N * M).fill(0.0);

function arrayMultiply() {
  resultA.fill(0.0);
  // 問題: ここで resultA に lhsA と rhsA の乗算結果を格納してね
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      let sum = 0;
      for (let k = 0; k < K; k++) {
        sum += lhsA[i * K + k] * rhsA[k * M + j];
      }
      resultA[i * M + j] = sum;
    }
  }
  return resultA;
}

// 型付き配列版 (Float64Array 以外の型も試してみると良い)
const lhsB = new Float64Array(N * K).fill(0.0).map((_, i) => lhsA[i]);
const rhsB = new Float64Array(K * M).fill(0.0).map((_, i) => rhsA[i]);
const resultB = new Float64Array(N * M).fill(0.0);

function typedArrayMultiply() {
  resultB.fill(0.0);
  // 問題: ここで resultB に lhsB と rhsB の乗算結果を格納してね
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      let sum = 0;
      for (let k = 0; k < K; k++) {
        sum += lhsB[i * K + k] * rhsB[k * M + j];
      }
      resultB[i * M + j] = sum;
    }
  }
  return resultB;
}

const TEST_TIMES = 100;
const TESTS = [arrayMultiply, typedArrayMultiply];
function test(fn) {
  let result;
  for (let i = 0; i < TEST_TIMES; ++i) {
    result = fn();
  }
  return result;
}

// warmup
for (let i = 0; i < TESTS.length; ++i) {
  test(TESTS[i]);
}

// 測定開始
for (let i = 0; i < TESTS.length; ++i) {
  const start = performance.now();
  test(TESTS[i]);
  const end = performance.now();
  console.log(`${TESTS[i].name}: ${end - start}`);
}

// 予想
// 型付き配列での計算の方が早い

// 結果
// const [N, K, M] = [100, 200, 300];
// arrayMultiply: 743.2421379983425
// typedArrayMultiply: 745.6671469993889

// const [N, K, M] = [1, 2, 3]
// arrayMultiply: 0.13693300262093544
// typedArrayMultiply: 0.09567699953913689

// const [N, K, M] = [10, 20, 30]
// arrayMultiply: 0.5548340007662773
// typedArrayMultiply: 0.649447999894619

// const [N, K, M] = [1000, 1, 1000];
// arrayMultiply: 341.61085300147533
// typedArrayMultiply: 273.6549700014293

// Kの値が小さい時は型付き配列の方が早い
