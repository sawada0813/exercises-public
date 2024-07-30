const Animal = require("./animal.js");

const isAnimalRenamed = (obj) => {
  return obj instanceof Animal;
};

module.exports = isAnimalRenamed;
