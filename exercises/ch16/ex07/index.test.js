import checkEntry from "./index.js";

describe("checkEntry", () => {
  test('should return "file"', async () => {
    const filePath = "./ch16/ex07/index.js";
    const result = await checkEntry(filePath);
    expect(result).toBe("file");
  });

  test('should return "directory"', async () => {
    const filePath = "./ch16/ex07/dummyDir";
    const result = await checkEntry(filePath);
    expect(result).toBe("directory");
  });

  test('should return "directory"', async () => {
    const filePath = "./ch16/ex07/dummyDir";
    const result = await checkEntry(filePath);
    expect(result).toBe("directory");
  });

  test('should throw "error"', async () => {
    expect.assertions(1);
    const filePath = "./ch16/ex07/unknown";
    try {
      await checkEntry(filePath);
    } catch (e) {
      expect(e).toBe("error");
    }
  });
});
