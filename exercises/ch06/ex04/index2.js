// writable
const sample01 = {};

Object.defineProperty(sample01, "writableFalseProperty", {
  value: 42,
  writable: false,
});

// sample.writableFalseProperty = 50
// ↓
// TypeError: Cannot assign to read only property 'propertyWritableFalse' of object '#<Object>'

Object.defineProperty(sample01, "writableTrueProperty", {
  value: 100,
  writable: true,
});

console.log(sample01.writableTrueProperty); // 100
sample01.propertyWritableTrue = 50;
console.log(sample01.writableTrueProperty); // 50

// hasOwnProperty
console.log(sample01.hasOwnProperty("writableFalseProperty")); // true
console.log(sample01.hasOwnProperty("writableTrueProperty")); // true

// propertyIsEnumerable
console.log(sample01.propertyIsEnumerable("writableFalseProperty")); // false
console.log(sample01.propertyIsEnumerable("writableTrueProperty")); // false

// enumerable
const sample02 = {
  numberProperty: 1,
  stringProperty: "a",
};

Object.defineProperty(sample02, "EnumerableFalseProperty", {
  value: "enumerableFalse",
  enumerable: false,
});

console.log(sample02); // { numberProperty: 1, stringProperty: 'a' }

Object.defineProperty(sample02, "EnumerableTrueProperty", {
  value: "enumerableTrue",
  enumerable: true,
});

console.log(sample02);
// {
//   numberProperty: 1,
//   stringProperty: 'a',
//   EnumerableTrueProperty: 'enumerableTrue'
// }

// hasOwnProperty
console.log(sample01.hasOwnProperty("EnumerableFalseProperty")); // false
console.log(sample01.hasOwnProperty("EnumerableTrueProperty")); // false

// propertyIsEnumerable
console.log(sample01.propertyIsEnumerable("EnumerableFalseProperty")); // false
console.log(sample01.propertyIsEnumerable("EnumerableTrueProperty")); // false

// configurable
const sample03 = {};

Object.defineProperty(sample03, "configurableFalseProperty", {
  value: "configurableFalse",
  configurable: false,
});

// sample03.configurableFalseProperty = "hoge"
// ↓
// TypeError: Cannot assign to read only property 'configurableFalseProperty' of object '#<Object>'

Object.defineProperty(sample03, "writableTrueProperty", {
  value: "writableTruePropertyValue",
  configurable: false,
  writable: true,
});

console.log(sample03.writableTrueProperty); // writableTruePropertyValue
sample03.writableTrueProperty = "hoge";
console.log(sample03.writableTrueProperty); // hoge

// delete sample03.configurableFalseProperty
// ↓
// TypeError: Cannot delete property 'configurableFalseProperty' of #<Object>

// hasOwnProperty
console.log(sample01.hasOwnProperty("configurableFalseProperty")); // false
console.log(sample01.hasOwnProperty("writableTrueProperty")); // true

// propertyIsEnumerable
console.log(sample01.propertyIsEnumerable("configurableFalseProperty")); // false
console.log(sample01.propertyIsEnumerable("writableTrueProperty")); // false
