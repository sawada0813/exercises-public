const obj = {
  name: "hoge",
  age: "25",
};

const startedAt = new Date();

with ({ name: "hoge", age: "25" }) {
  console.log(name);
}

console.log(new Date() - startedAt);

const startedAt2 = new Date();
console.log(obj.name);
console.log(new Date() - startedAt2);

// 実行結果
// hoge
// 9
// hoge
// 0
