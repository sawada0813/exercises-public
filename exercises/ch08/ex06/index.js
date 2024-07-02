const m = function (arg) {
  console.log(arg[1]);
};
m("a", "b");

const m2 = function (...arg) {
  console.log(arg[1]);
};
m2("a", "b");

const m3 = (...arg) => {
  console.log(arg[1]);
};
m3("a", "b");
