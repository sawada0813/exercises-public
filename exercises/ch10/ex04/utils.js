import { Animal } from "./classes/index.js";

const isAnimal = (obj) => {
  return obj instanceof Animal;
};

export { isAnimal };
