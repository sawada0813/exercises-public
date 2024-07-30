const Animal = require("./animal.cjs");
const isAnimal = require("./utils.cjs");

const animal = new Animal();

animal.eat(); // I am eating
console.log(isAnimal(animal)); // true
console.log(isAnimal(42)); // false
