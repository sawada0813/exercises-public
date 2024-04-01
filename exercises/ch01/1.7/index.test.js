import { Point } from "./index.js";

describe("Point class", () => {
  it("add", () => {
    const point = new Point(1, 2);
    expect(point.x).toBe(1);
    expect(point.y).toBe(2);
    point.add(1, 2);
    expect(point.x).toBe(2);
    expect(point.y).toBe(4);
  });
});
