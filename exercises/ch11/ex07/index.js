const sample1 = "(()(()))";
const sample2 = "(((())))";
const sample3 = "((())";
const sample4 = "()()())";

const deleteParentheses = (str) => {
  while (str !== "") {
    if (!str.match(/\(\)/)) break;
    str = str.replace(/\(\)/g, "");
  }
  return str;
};

console.log(deleteParentheses(sample1).match(/[()]/));
console.log(deleteParentheses(sample2).match(/[()]/));
console.log(deleteParentheses(sample3).match(/[()]/));
console.log(deleteParentheses(sample4).match(/[()]/));

// null
// null
// [ '(', index: 0, input: '(', groups: undefined ]
// [ ')', index: 0, input: ')', groups: undefined ]

// 正規表現では括弧の対応を判定できない
// 正規表現はネストされた構造を判定するのが難しい。なぜなら正規表現は線形のパターンマッチングを行うため。
// また、括弧の対応を判定するためにはスタックを使うのが一般的であり、正規表現でスタックを再現できない。
// 問題文にあるような単純な過去の対応（"()"や"[]"など）を判定する場合は正規表現を使うことができるが、ネストされた構造を判定する場合は正規表現を使うことができない。
