const Animal = require("./animal.js");
const isAnimal = require("./utils.js");

const animal = new Animal();

animal.eat(); // I am eating
console.log(isAnimal(animal)); // true
console.log(isAnimal(42)); // false

// package.json の "type": "module" を消して実行する
