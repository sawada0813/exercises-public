export const sequenceToObject = (...args) => {
  if (args.length % 2 !== 0) throw "args length must be even number";
  const result = {};
  args.forEach((elem, index, array) => {
    if ((index + 1) % 2 !== 0) {
      if (typeof elem !== "string") throw "odd number element must be string";
      result[elem] = array[index + 1];
    }
  });
  return result;
};
