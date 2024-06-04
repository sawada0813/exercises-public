import { prototypeSample } from ".";

it("継承オブジェクトのテスト", () => {
  const childSample = Object.create(prototypeSample);
  expect(Object.getPrototypeOf(childSample)).toBe(prototypeSample);
});
