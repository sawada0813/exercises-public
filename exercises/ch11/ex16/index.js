export const retryWithExponentialBackoff = (object, maxRetry, callback) => {
  let interval = 1000;
  let result = null;
  let numOfCall = 0;
  const intervalId = setInterval(() => {
    result = object.func();
    numOfCall++;
    if (result === true) {
      callback(result);
      return;
    }
    if (numOfCall >= maxRetry) {
      callback(result);
      clearInterval(intervalId);
      return;
    }
    interval *= 2;
  }, interval);
};
