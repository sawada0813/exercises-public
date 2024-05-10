function throwError() {
  throw "dummy error";
}

try {
  console.log("try");
  throwError();
} catch (e) {
  console.log("catch");
} finally {
  console.log("finally");
}

// try
// catch
// finally
