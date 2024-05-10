const user = {
  name: "taro",
  age: 30,
  area: "Tokyo",
};

console.log(user);

debugger;

console.log("part 1");

debugger;

console.log("part 2");

// node のオプションで innspect を使用するとデバッグモードになる
// n を押すとステップが進む

// 実行結果
// $ node inspect ch05/5.11/index.js
// kyoyasawada@sawada-mac:~/workshop/js/github/exercises-public/exercises (main)$ node inspect ch05/5.11/index.js
// < Debugger listening on ws://127.0.0.1:9229/09480b67-c0cc-4c6b-a0dd-bc34cc30a71b
// < For help, see: https://nodejs.org/en/docs/inspector
// <
// < Debugger attached.
// <
//  ok
// Break on start in ch05/5.11/index.js:1
// > 1 const user = {
//   2   name: 'taro',
//   3   age: 30,
// debug> n
// break in ch05/5.11/index.js:1
// > 1 const user = {
//   2   name: 'taro',
//   3   age: 30,
// debug> n
// break in ch05/5.11/index.js:7
//   5 }
//   6
// > 7 console.log(user)
//   8
//   9 debugger;
// debug> n
// < { name: 'taro', age: 30, area: 'Tokyo' }
// <
// break in ch05/5.11/index.js:9
//   7 console.log(user)
//   8
// > 9 debugger;
//  10
//  11 console.log('part 1')
// debug> n
// break in ch05/5.11/index.js:11
//   9 debugger;
//  10
// >11 console.log('part 1')
//  12
//  13 debugger;
// debug> n
// < part 1
// <
// break in ch05/5.11/index.js:13
//  11 console.log('part 1')
//  12
// >13 debugger;
//  14
//  15 console.log('part 2')
// debug> n
// break in ch05/5.11/index.js:15
//  13 debugger;
//  14
// >15 console.log('part 2')
//  16
//  17
