export function any(...f) {
  return function (...args) {
    let result = false;
    f.forEach((f) => {
      result = result || f.call(this, args);
    });
    return result;
  };
}
