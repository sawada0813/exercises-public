const seq = [1, 2, 3, 4, 5];

export function pop(array) {
  const result = array.concat();
  return result.slice(0, result.length - 1);
}

export function push(array, elem) {
  const result = array.concat(elem);
  return result;
}

export function shift(array) {
  const result = array.concat();
  return result.slice(1, result.length);
}

export function unshift(array, elem) {
  return [elem].concat(array);
}

export function sort(array, f) {
  const result = array.concat();
  Array.prototype.sort.call(result, f);
  return result;
}
