function* fibonacciSequenceGenerator() {
  let a = 0;
  let b = 1;
  for (;;) {
    yield b;
    [a, b] = [b, a + b];
  }
}

function fibonacciSequence() {
  let a = 0;
  let b = 1;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [a, b] = [b, a + b];
      return { value: a, done: false };
    },
  };
}

export { fibonacciSequenceGenerator, fibonacciSequence };
