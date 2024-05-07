// if (foo === void 0) { ... }

// void 0 は評価されたら破棄されて undefined になる
// 昔はグローバルスコープの変数である undefined が上書きされてしまう可能性があったが、現在はできないため
// cf: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined#%E8%A7%A3%E8%AA%AC