function f() {
  try {
    return true
  } finally {
    return false // Unsafe usage of ReturnStatement.
  }
}

console.log(f())

// 予想: true
// 結果: false
// try の後に finally が走って false が return された