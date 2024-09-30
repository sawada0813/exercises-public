import { proxyConstructObject } from './index.js';

test('proxyConstructObject', () => {
  const testObject = {
    sum(a, b) {
      return a + b;
    }
  }
  const { p, result } = proxyConstructObject(testObject);
  
  expect(p.sum(1, 2)).toBe(3);
  expect(result.length).toBe(1);
  expect(result[0].method).toBe("sum");
  expect(result[0].param).toStrictEqual([1, 2])
  expect(result[0].time).toBeDefined()
  expect(typeof result[0].time).toBe('number')
});