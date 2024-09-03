import * as fsPromises from "node:fs/promises";

function fetchFirstFileSize(path) {
  return fsPromises
    .readdir(path)
    .then((files) => fsPromises.stat([path, files[0]].join("")))
    .then((stats) => stats.size)
    .catch((error) => {
      throw new Error(error);
    });
}

function fetchSumOfFileSizes(path) {
  return fsPromises
    .readdir(path)
    .then((files) => {
      const statsPromises = files.map((file) => {
        return fsPromises
          .stat([path, file].join(""))
          .then((stats) => {
            return stats.size;
          })
          .catch((error) => {
            throw error;
          });
      });
      return Promise.all(statsPromises);
    })
    .then((sizes) => sizes.reduce((total, size) => total + size, 0))
    .catch((error) => {
      throw new Error(error);
    });
}

export { fetchFirstFileSize, fetchSumOfFileSizes };
