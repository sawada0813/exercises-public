export function fizzbuzz() {
  let result = ''
  for (let i = 1; i < 101; i++) {
    if (i % 15 && i % 3 && i % 5) {
      result += `${i}\n`
    } else if (i % 15 && i % 3) {
      result += `Buzz\n`
    } else if (i % 15) {
      result += `Fizz\n`
    } else {
      result += `FizzBuzz\n`
    }

  }
  return result
}
