import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.js";

describe("fetchFirstFileSize", () => {
  it("return 4", () => {
    expect.assertions(1);
    const size = fetchFirstFileSize("./ch13/ex04/testFiles/");
    return expect(size).resolves.toBe(4);
  });
  it("throw Error when got no exist path ", () => {
    expect.assertions(1);
    return expect(fetchFirstFileSize("./not-exist/")).rejects.toBeInstanceOf(
      Error,
    );
  });
});

describe("fetchSumOfFileSizes", () => {
  it("return 12", () => {
    expect.assertions(1);
    const size = fetchSumOfFileSizes("./ch13/ex04/testFiles/");
    return expect(size).resolves.toBe(12);
  });
  it("throw Error when got no exist path ", () => {
    expect.assertions(1);
    return expect(fetchSumOfFileSizes("./not-exist/")).rejects.toBeInstanceOf(
      Error,
    );
  });
});
