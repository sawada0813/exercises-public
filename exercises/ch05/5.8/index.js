let x = 0

for (let i = 1; i <= 5; i++) {
  x = i
  try {
    throw Error()
  } catch {
    break
  } finally {
    continue
  }
}

console.log(x)

// 予想: 5
// 結果: 5
// for 文の本体実行後にインクリメントが走るため
// try catchに関係なくインクリメントされる