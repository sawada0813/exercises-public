import { fibonacciSequenceGenerator, fibonacciSequence } from "./index.js";

describe('fibonacciSequence', () => {
  describe('fibonacciSequenceGeneratorと一致しているかのテスト', () => {
    test('The outputs of fibonacciSequence and fibonacciSequenceGenerator are the same.', () => {
      const fib = fibonacciSequence()
      const fibGen = fibonacciSequenceGenerator()
      expect(fib.next()).toStrictEqual(fibGen.next())
      expect(fib.next()).toStrictEqual(fibGen.next())
      expect(fib.next()).toStrictEqual(fibGen.next())
      expect(fib.next()).toStrictEqual(fibGen.next())
      expect(fib.next()).toStrictEqual(fibGen.next())
      expect(fib.next()).toStrictEqual(fibGen.next())
    })
  })

  describe('フィボナッチ数列のテスト', () => {
    test('generates the first few Fibonacci numbers correctly', () => {
      const gen = fibonacciSequence()
      expect(gen.next().value).toBe(1)
      expect(gen.next().value).toBe(1)
      expect(gen.next().value).toBe(2)
      expect(gen.next().value).toBe(3)
      expect(gen.next().value).toBe(5)
      expect(gen.next().value).toBe(8)
    })

    test('generates a large Fibonacci number correctly', () => {
      const gen = fibonacciSequence()
      let fib
      for (let i = 1; i < 50; i++) {
        fib = gen.next().value
      }
      expect(fib).toBe(7778742049)
    })

    test('handles multiple generators independently', () => {
      const gen1 = fibonacciSequence()
      const gen2 = fibonacciSequence()
      expect(gen1.next().value).toBe(1)
      expect(gen2.next().value).toBe(1)
      expect(gen1.next().value).toBe(1)
      expect(gen2.next().value).toBe(1)
      expect(gen1.next().value).toBe(2)
      expect(gen2.next().value).toBe(2)
    })
  })
})