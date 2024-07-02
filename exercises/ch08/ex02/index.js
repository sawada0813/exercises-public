export const squared = (x, n) => {
  if (n === 1) return x;
  return x * squared(x, n - 1);
};
