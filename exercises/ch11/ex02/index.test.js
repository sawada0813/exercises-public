import { slowFn, cachedSlowFn } from "./index.js";

describe("cache", () => {
  test("slowFnとcachedSlowFnの実行結果が等しい", () => {
    const sample = { name: "hoge" };
    const uncachedResult = slowFn(sample);
    const cachedResult = cachedSlowFn(sample);
    expect(uncachedResult).toBe(cachedResult);
  });
  test("slowFnよりcachedSlowFnのほうが速い", () => {
    const sample = { name: "hoge" };
    let start = performance.now();
    for (let i = 0; i < 100; i++) {
      cachedSlowFn(sample);
    }
    let end = performance.now();
    const cachedTime = end - start;
    start = performance.now();
    for (let i = 0; i < 100; i++) {
      slowFn(sample);
    }
    end = performance.now();
    const uncachedTime = end - start;
    expect(cachedTime).toBeLessThan(uncachedTime);
  });
});
