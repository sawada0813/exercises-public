import { mkdir, readdir, stat, rmdir } from "./index.js";

describe("ex03", () => {
  afterEach(() => {
    return rmdir("./ch13/ex03/A", { recursive: true })
      .then(() => rmdir("./ch13/ex03/B", { recursive: true }))
      .then(() => rmdir("./ch13/ex03/C", { recursive: true }));
  });
  it("mkdir A, B, and C", () => {
    return mkdir("./ch13/ex03/A")
      .then(() => mkdir("./ch13/ex03/B"))
      .then(() => mkdir("./ch13/ex03/C"))
      .then(() => stat("./ch13/ex03/A"))
      .then((stats) => expect(stats.isDirectory()).toBe(true))
      .then(() => stat("./ch13/ex03/B"))
      .then((stats) => expect(stats.isDirectory()).toBe(true))
      .then(() => stat("./ch13/ex03/C"))
      .then((stats) => expect(stats.isDirectory()).toBe(true));
  });
  it("readdir A, B and C", () => {
    return mkdir("./ch13/ex03/A")
      .then(() => readdir("./ch13/ex03/A"))
      .then((files) => expect(files).toStrictEqual([]))
      .then(() => mkdir("./ch13/ex03/B"))
      .then(() => readdir("./ch13/ex03/B"))
      .then((files) => expect(files).toStrictEqual([]))
      .then(() => mkdir("./ch13/ex03/C"))
      .then(() => readdir("./ch13/ex03/C"))
      .then((files) => expect(files).toStrictEqual([]));
  });
});
