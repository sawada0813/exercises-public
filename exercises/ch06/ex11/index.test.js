import { object } from "./index.js";

describe("object", () => {
  it("正常系", () => {
    const testObject = Object.create(object);
    testObject.setX = 1;
    testObject.setY = 1;
    const expectedResult = Math.sqrt(2);
    expect(testObject.r).toBe(expectedResult);
  });
  it("異常系", () => {
    expect.assertions(2);
    const testObject = Object.create(object);
    try {
      testObject.setY = "one";
    } catch (e) {
      expect(e).toBe("NaN is not assignable");
    }
    try {
      testObject.setX = "two";
    } catch (e) {
      expect(e).toBe("NaN is not assignable");
    }
  });
});
