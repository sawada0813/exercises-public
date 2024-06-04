const samplePrototypeObject = {
  prototypeNumberProperty: 42,
  prototypeStringProperty: "hoge",
  prototypeEnumerableProperty: ["1", "2", "3"],
};
const sampleObject = Object.create(samplePrototypeObject);
sampleObject.prototypeNumberProperty = 100;
sampleObject.originalStringProperty = "fuga";
sampleObject.prototypeEnumerableProperty = null;

console.log("samplePrototypeObject");
for (const property in samplePrototypeObject) {
  console.log(`${property}: ` + samplePrototypeObject[property]);
}

console.log("sampleObject");
for (const property in sampleObject) {
  console.log(`${property}: ` + sampleObject[property]);
}

// ↓実行結果↓
// samplePrototypeObject
// prototypeNumberProperty: 42
// prototypeStringProperty: hoge
// prototypeEnumerableProperty: 1, 2, 3

// sampleObject
// prototypeNumberProperty: 100
// originalStringProperty: fuga
// prototypeEnumerableProperty: null
// prototypeStringProperty: hoge

// ↓考察↓
// sampleObjectのプロパティ→継承したPrototypeオブジェクトのプロパティの順に取り出される
