const obj1 = { x: 1 };
console.log(obj1); // { x: 1 }
obj1.y = 2;
console.log(obj1); // { x: 1, y: 2 }

const obj2 = { x: 1, y: 2 };
console.log(obj1 === obj2); // false

export function equals(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
