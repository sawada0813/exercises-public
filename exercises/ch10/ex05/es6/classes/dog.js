import AnimalRenamed from "./animal.js";

class Dog {
  constructor() {
    this.animal = new AnimalRenamed();
  }
  bite() {
    console.log("I am biting");
  }
  eac() {
    return this.animal.eat();
  }
  makeSound() {
    return this.animal.makeSound();
  }
}

export default Dog;
