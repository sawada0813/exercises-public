class Animal {
  eat() {
    console.log('I am eating')
  }
  makeSound() {
    console.log('I am making sound')
  }
}

class Dog {
  constructor() {
    this.animal = new Animal()
  }
  bite() {
    console.log('I am biting')
  }
  eac() {
    return this.animal.eat()
  }
  makeSound() {
    return this.animal.makeSound()
  }
}

class Cat {
  constructor() {
    this.animal = new Animal()
  }
  scratch() {
    console.log('I am scratching')
  }
  eac() {
    return this.animal.eat()
  }
  makeSound() {
    return this.animal.makeSound()
  }
}

class Bird {
  constructor() {
    this.animal = new Animal()
  }
  fly() {
    console.log('I am flying')
  }
  eac() {
    return this.animal.eat()
  }
  makeSound() {
    return this.animal.makeSound()
  }
}

class Fish {
  constructor() {
    this.animal = new Animal()
  }
  eat() {
    return this.animal.eat()
  }
  swim() {
    console.log('I am swimming')
  }
}