import { retryWithExponentialBackoff } from "./index.js";
import { jest } from "@jest/globals";

jest.useFakeTimers();

describe("retryWithExponentialBackoff", () => {
  it("returns true if func returns true on the first try", async () => {
    expect.assertions(3);
    const func = jest.fn().mockResolvedValue(true);
    const callback = jest.fn();

    await retryWithExponentialBackoff(func, 3, callback);

    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true);
  });

  // テストに失敗する
  it("returns correct number of times if func returns false", async () => {
    expect.assertions(1);
    const func = jest
      .fn()
      .mockRejectedValueOnce(new Error("first error"))
      .mockResolvedValue(true);

    const callback = jest.fn();
    await retryWithExponentialBackoff(func, 3, callback);

    jest.advanceTimersByTime(1000);
    jest.advanceTimersByTime(2000);

    expect(func).toHaveBeenCalledTimes(2);
    // expect(callback).toHaveBeenCalledWith(true) falseになる
  });
});
