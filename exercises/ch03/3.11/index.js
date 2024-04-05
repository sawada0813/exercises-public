const property_1 = Symbol("same string");
const property_2 = Symbol("same string");
const object = {};
object[property_1] = 1;
object[property_2] = 2;
console.log(object);
console.log(object[property_1]);
console.log(object[property_2]);

const property_3 = Symbol.for("same string");
const property_4 = Symbol.for("same string");
const object_2 = {};
object_2[property_3] = 1;
object_2[property_4] = 2;
console.log(object_2);
console.log(object_2[property_3]); // 2
console.log(object_2[property_4]); // 2
console.log(property_3 === property_4); // true
