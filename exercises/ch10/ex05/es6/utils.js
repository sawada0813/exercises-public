// import { Animal } from "./classes/index.js";
import AnimalRenamed from "./classes/animal.js";

const isAnimalRenamed = (obj) => {
  return obj instanceof AnimalRenamed;
};

export { isAnimalRenamed as isAnimal };
