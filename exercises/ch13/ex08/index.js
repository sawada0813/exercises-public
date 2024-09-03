import * as fsPromises from "node:fs/promises";

async function fetchFirstFileSize(path) {
  try {
    const files = await fsPromises.readdir(path);
    const stats = await fsPromises.stat([path, files[0]].join(""));
    return stats.size;
  } catch (e) {
    throw new Error(e);
  }
}

async function fetchSumOfFileSizes(path) {
  try {
    const files = await fsPromises.readdir(path);
    const sizes = await Promise.all(
      files.map(async (file) => {
        const stat = await fsPromises.stat([path, file].join(""));
        return stat.size;
      }),
    );
    return sizes.reduce((sum, size) => sum + size, 0);
  } catch (e) {
    throw new Error(e);
  }
}

export { fetchFirstFileSize, fetchSumOfFileSizes };
