const Animal = require("./animal.cjs");

const isAnimalRenamed = (obj) => {
  return obj instanceof Animal;
};

module.exports = isAnimalRenamed;
