export function abs(x) {
  if (x < 0) {
    return -x;
  } else {
    return x;
  }
}

export function sum(x, y) {
  return x + y;
}

export function factorial(n) {
  if (n <= 0) return n;
  let result = 1;
  for (let i = 1; i < n + 1; i++) {
    result = result * i;
  }
  return result;
}
