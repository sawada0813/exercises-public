export const expandTypeNames = (strings, ...values) => {
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    result +=
      Object.prototype.toString.call(values[i]).slice(8, -1) + strings[i + 1];
  }
  return result;
};
