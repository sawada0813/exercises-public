const modules = {};
function require(moduleName) {
  return modules[moduleName];
}

modules["sets.js"] = (function () {
  const exports = {};

  exports.BitSet = class BitSet {};

  return exports;
})();

modules["stats.js"] = (function () {
  const exports = {};

  const sum = (x, y) => x + y;
  const square = (x) => x * y;
  exports.mean = function (data) {}; // 省略
  exports.stddev = function (data) {}; // 省略

  return exports;
})();
