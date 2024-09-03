import * as fsPromises from "node:fs/promises";

async function fetchSumOfFileSizes(path) {
  try {
    const files = await fsPromises.readdir(path);
    const stats = await Promise.all(
      files.map((file) => fsPromises.stat([path, file].join('')))
    )
    return stats.reduce((acc, stat) => acc + stat.size, 0)
  } catch (error) {
    throw new Error(error);
  }
}

export { fetchSumOfFileSizes };
