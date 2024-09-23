const fs = require("fs");
const readLines = require("./index.cjs");

describe("readLines", () => {
  const testFilePath = "./ch12/ex05/sample.txt";
  beforeEach(() => {
    fs.writeFileSync(testFilePath, "");
  });

  afterEach(() => {
    fs.unlinkSync(testFilePath);
  });

  const expectedLines = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ];

  test("return line from text file of expectedLines", () => {
    fs.writeFileSync(testFilePath, expectedLines.join("\n"));
    const lines = readLines(testFilePath);
    expectedLines.forEach((line) => {
      expect(lines.next().value).toBe(line);
    });
    expect(lines.next().done).toBe(true);
  });

  test("return line from one line text file", () => {
    fs.writeFileSync(testFilePath, expectedLines[0]);
    const lines = readLines(testFilePath);
    expect(lines.next().value).toBe(expectedLines[0]);
    expect(lines.next().done).toBe(true);
  });

  test("return line from very large file", () => {
    const numRepeats = 1000;
    fs.writeFileSync(
      testFilePath,
      (expectedLines.join("\n") + "\n").repeat(numRepeats),
    );
    const lines = readLines(testFilePath);
    for (let i = 0; i < numRepeats; i++) {
      expectedLines.forEach((line) => {
        expect(lines.next().value).toBe(line);
      });
    }
    expect(lines.next().done).toBe(true);
  });

  test("works for empty file", () => {
    fs.writeFileSync(testFilePath, "");
    const lines = readLines(testFilePath);
    expect(lines.next().done).toBe(true);
  });
  // クローズできているか
});
