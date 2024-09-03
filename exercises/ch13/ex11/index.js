export async function retryWithExponentialBackoff(func, maxRetry, callback) {
  let retryCount = 0
  async function retryFunc() {
    let result = false
    try {
      result = await func()
    } catch (e) {
      // 
    }
    if (result === true) {
      callback(true)
      return
    }
    callback(false)
    if (retryCount < maxRetry) {
      setTimeout(retryFunc, Math.pow(2, retryCount) * 1000)
    } else {
      return
    }
    retryCount++
  }
  retryFunc()
}
