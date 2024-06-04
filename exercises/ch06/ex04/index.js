export const sampleObject01 = {};
export const sampleObject02 = {};
export const sampleObject03 = {};
export const sampleObject04 = {};
export const sampleObject05 = {};
export const sampleObject06 = {};
export const sampleObject07 = {};
export const sampleObject08 = {};
export const sampleObject09 = {};
export const sampleObject10 = {};
export const sampleObject11 = {};
export const sampleObject12 = {};
export const sampleObject13 = {};
export const sampleObject14 = {};
export const sampleObject15 = {};
export const sampleObject16 = {};

Object.defineProperty(sampleObject01, "property", {
  value: 42,
  writable: false,
  enumerable: false,
  configurable: false,
});
Object.defineProperty(sampleObject02, "property", {
  value: "42",
  writable: false,
  enumerable: false,
  configurable: false,
});
Object.defineProperty(sampleObject03, "property", {
  value: 42,
  writable: true,
  enumerable: false,
  configurable: false,
});
Object.defineProperty(sampleObject04, "property", {
  value: 42,
  writable: false,
  enumerable: true,
  configurable: false,
});
Object.defineProperty(sampleObject05, "property", {
  value: 42,
  writable: false,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(sampleObject06, "property", {
  value: "42",
  writable: true,
  enumerable: false,
  configurable: false,
});
Object.defineProperty(sampleObject07, "property", {
  value: "42",
  writable: false,
  enumerable: true,
  configurable: false,
});
Object.defineProperty(sampleObject08, "property", {
  value: "42",
  writable: false,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(sampleObject09, "property", {
  value: 42,
  writable: true,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(sampleObject10, "property", {
  value: 42,
  writable: false,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(sampleObject11, "property", {
  value: 42,
  writable: true,
  enumerable: true,
  configurable: false,
});
Object.defineProperty(sampleObject12, "property", {
  value: "42",
  writable: true,
  enumerable: true,
  configurable: false,
});
Object.defineProperty(sampleObject13, "property", {
  value: "42",
  writable: true,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(sampleObject14, "property", {
  value: "42",
  writable: false,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(sampleObject15, "property", {
  value: 42,
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(sampleObject16, "property", {
  value: "42",
  writable: true,
  enumerable: true,
  configurable: true,
});

const sampleObjectArray = [
  sampleObject01,
  sampleObject02,
  sampleObject03,
  sampleObject04,
  sampleObject05,
  sampleObject06,
  sampleObject07,
  sampleObject08,
  sampleObject09,
  sampleObject10,
  sampleObject11,
  sampleObject12,
  sampleObject13,
  sampleObject14,
  sampleObject15,
  sampleObject16,
];

for (const sampleObject of sampleObjectArray) {
  console.log(`\n`);
  console.log(`hasOwnProperty: ` + sampleObject.hasOwnProperty("property"));
  console.log(
    `propertyIsEnumerable: ` + sampleObject.propertyIsEnumerable("property"),
  );
  // プロパティが上書きできるか確認
  try {
    sampleObject.property = 10;
    console.log("success overwrite");
  } catch (e) {
    console.log(e.message);
  } // プロパティ削除できるか確認
  try {
    delete sampleObject.property;
    console.log("success delete");
  } catch (e) {
    console.log(e.message);
  }
}

// 実行結果↓

// hasOwnProperty: true
// propertyIsEnumerable: false
// Cannot assign to read only property 'property' of object '#<Object>'
// Cannot delete property 'property' of #<Object>

// hasOwnProperty: true
// propertyIsEnumerable: false
// Cannot assign to read only property 'property' of object '#<Object>'
// Cannot delete property 'property' of #<Object>

// hasOwnProperty: true
// propertyIsEnumerable: false
// success overwrite
// Cannot delete property 'property' of #<Object>

// hasOwnProperty: true
// propertyIsEnumerable: true
// Cannot assign to read only property 'property' of object '#<Object>'
// Cannot delete property 'property' of #<Object>

// hasOwnProperty: true
// propertyIsEnumerable: false
// Cannot assign to read only property 'property' of object '#<Object>'
// success delete

// hasOwnProperty: true
// propertyIsEnumerable: false
// success overwrite
// Cannot delete property 'property' of #<Object>

// hasOwnProperty: true
// propertyIsEnumerable: true
// Cannot assign to read only property 'property' of object '#<Object>'
// Cannot delete property 'property' of #<Object>

// hasOwnProperty: true
// propertyIsEnumerable: false
// Cannot assign to read only property 'property' of object '#<Object>'
// success delete

// hasOwnProperty: true
// propertyIsEnumerable: false
// success overwrite
// success delete

// hasOwnProperty: true
// propertyIsEnumerable: true
// Cannot assign to read only property 'property' of object '#<Object>'
// success delete

// hasOwnProperty: true
// propertyIsEnumerable: true
// success overwrite
// Cannot delete property 'property' of #<Object>

// hasOwnProperty: true
// propertyIsEnumerable: true
// success overwrite
// Cannot delete property 'property' of #<Object>

// hasOwnProperty: true
// propertyIsEnumerable: false
// success overwrite
// success delete

// hasOwnProperty: true
// propertyIsEnumerable: true
// Cannot assign to read only property 'property' of object '#<Object>'
// success delete

// hasOwnProperty: true
// propertyIsEnumerable: true
// success overwrite
// success delete

// hasOwnProperty: true
// propertyIsEnumerable: true
// success overwrite
// success delete
