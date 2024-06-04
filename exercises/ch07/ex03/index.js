export function sum(array) {
  if (!array) return 0;
  return array.reduce((x, y) => x + y, 0);
}

export function join(array, separator) {
  if (separator === null) {
    return array.reduce(
      (x, y) =>
        x === ""
          ? y
          : x +
            (separator === null ? "null" : separator) +
            (y === null ? ",," : y),
      "",
    );
  } else {
    return array.reduce((x, y) => x + (y === null ? ",," : y), "");
  }
}

export function reverse(array) {
  if (array.length === 0) return [];
  const result = array.reduce((x, y) => [y].concat(x));
  if (result.length === 1) {
    return [result];
  } else {
    return result;
  }
}

export function every(array, f) {
  let index = 0;
  return array.reduce(
    (x, y) => (f(y, index++, array) && x ? true : false),
    true,
  );
}

export function some(array, f) {
  let index = 0;
  return array.reduce(
    (x, y) => (f(y, index++, array) || x ? true : false),
    false,
  );
}
