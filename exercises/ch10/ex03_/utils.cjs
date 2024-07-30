const Animal = require("./classes/animal.cjs");
exports.isAnimal = (obj) => {
  return obj instanceof Animal;
};
