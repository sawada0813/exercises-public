整数の最大値：9007199254740991
整数の最小値：-9007199254740991
整数の最大値+1：9007199254740992
整数の最大値+1と+2の===でに比較結果：true

## 整数の最大値+1と+2の===でに比較結果がtrueとなる理由

オペランドが2つとも安全な整数でないため IEEE-754 では表現できず、四捨五入や切り捨ての丸めによって誤差が生じる。
参考

- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
