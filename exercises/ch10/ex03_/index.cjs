const Animal = require("./classes/animal.cjs");
const Dog = require("./classes/dog.cjs");
const { isAnimal } = require("./utils.cjs");

const animal = new Animal();
const dog = new Dog();

animal.eat(); // I am eating
console.log(isAnimal(animal)); // true
console.log(isAnimal(dog)); // false
console.log(isAnimal(42)); // false
