import { retryWithExponentialBackoff } from "./index.js";
import { jest } from "@jest/globals";

jest.useFakeTimers();

// ３回目の呼び出しで成功するクラス
class TestObject {
  constructor() {
    this.count = 0;
  }
  func() {
    if (this.count === 2) {
      this.count = 0;
      return true;
    } else {
      this.count++;
      return false;
    }
  }
}

describe("retryWithExponentialBackoff", () => {
  test("3 times call", () => {
    const callback = jest.fn();
    const testObject = new TestObject();
    retryWithExponentialBackoff(testObject, 3, callback);
    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledWith(true);
  });
  test("2 times call", () => {
    const callback = jest.fn();
    const testObject = new TestObject();
    retryWithExponentialBackoff(testObject, 2, callback);
    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledWith(false);
  });
});
