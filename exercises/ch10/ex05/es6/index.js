import { Animal, Dog } from "./classes/index.js";
import { isAnimal } from "./utils.js";

const animal = new Animal();
const dog = new Dog();

animal.eat(); // I am eating
console.log(isAnimal(animal)); // true
console.log(isAnimal(dog)); // false
console.log(isAnimal(42)); // false
