import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.js";

describe("fetchFirstFileSize", () => {
  it("return 4", async () => {
    expect.assertions(1);
    const size = await fetchFirstFileSize("./ch13/ex08/testFiles/");
    await expect(size).toBe(4);
  });
  it("throw Error when got no exist path ", () => {
    expect.assertions(1);
    return expect(fetchFirstFileSize("./not-exist/")).rejects.toBeInstanceOf(
      Error,
    );
  });
});

describe("fetchSumOfFileSizes", () => {
  it("return 12", async () => {
    expect.assertions(1);
    const size = await fetchSumOfFileSizes("./ch13/ex08/testFiles/");
    await expect(size).toBe(12);
  });
  it("throw Error when got no exist path ", async () => {
    expect.assertions(1);
    return expect(fetchFirstFileSize("./not-exist/")).rejects.toBeInstanceOf(
      Error,
    );
  });
});
