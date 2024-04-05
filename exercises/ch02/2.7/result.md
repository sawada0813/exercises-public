## 実行結果

0 1 0
1 1 0

省略されたセミコロンを追加すると次のようになる

```javascript
let a = 0,
  b = 0;

// prettier-ignore
const c
=
a;
// prettier-ignore
++
b;

console.log(a, b, c);

// prettier-ignore
const e = a++;
b;

console.log(a, b, e);
```
