function fizzbuzz(n) {
  const arr = [...Array(n)].map((_, i) => i);
  let result = arr.filter((x) => x !== 0);
  result = result.map((x) => (x % 15 === 0 ? "FizzBuzz" : x));
  result = result.map((x) => (x % 3 === 0 ? "Fizz" : x));
  result = result.map((x) => (x % 5 === 0 ? "Buzz" : x));
  console.log(result);
}

fizzbuzz(50);

// [
//   1,          2,          'Fizz',     4,
//   'Buzz',     'Fizz',     7,          8,
//   'Fizz',     'Buzz',     11,         'Fizz',
//   13,         14,         'FizzBuzz', 16,
//   17,         'Fizz',     19,         'Buzz',
//   'Fizz',     22,         23,         'Fizz',
//   'Buzz',     26,         'Fizz',     28,
//   29,         'FizzBuzz', 31,         32,
//   'Fizz',     34,         'Buzz',     'Fizz',
//   37,         38,         'Fizz',     'Buzz',
//   41,         'Fizz',     43,         44,
//   'FizzBuzz', 46,         47,         'Fizz',
//   49
// ]

function sumOfSquaredDifference(f, g) {
  let result = 0;
  f.forEach(function (v, i, a) {
    result += (a[i] - g[i]) ** 2;
  });
  return result;
}

console.log(sumOfSquaredDifference([5, 6, 7, 8], [2, 3, 4, 5]));

// 36

function sumOfEvensIsLargerThan42(array) {
  // let sum = 0
  // for (let i = 0; i < array.length; i++) {
  //   if (array[i] % 2 !== 0) {
  //     continue
  //   }
  //   sum += array[i]
  //   if (sum >= 42) {
  //     return true
  //   }
  // }
  // return false
  let sumOfEvens = 0;
  array.forEach((value) => (value % 2 === 0 ? (sumOfEvens += value) : value));
  return sumOfEvens >= 42;
}

console.log(
  sumOfEvensIsLargerThan42([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
);
console.log(sumOfEvensIsLargerThan42([40, 1, 3, 5]));

// true
// false
