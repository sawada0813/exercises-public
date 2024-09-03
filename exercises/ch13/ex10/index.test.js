import { fetchSumOfFileSizes } from "./index.js";

describe("fetchSumOfFileSizes", () => {
  it("return 12", async () => {
    expect.assertions(1);
    const size = await fetchSumOfFileSizes('./ch13/ex10/testFiles/')
    await expect(size).toBe(12);
  });
  it("throw Error when got no exist path ", () => {
    expect.assertions(1);
    return expect(fetchSumOfFileSizes("./not-exist/")).rejects.toBeInstanceOf(
      Error,
    );
  });
});
