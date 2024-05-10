export const add = function (obj1, obj2) {
  return {
    real: obj1.real + obj2.real,
    imaginary: obj1.imaginary + obj2.imaginary,
  };
};

export const sub = function (obj1, obj2) {
  return {
    real: obj1.real - obj2.real,
    imaginary: obj1.imaginary - obj2.imaginary,
  };
};

export const mul = function (obj1, obj2) {
  return {
    real: obj1.real * obj2.real,
    imaginary: obj1.imaginary * obj2.imaginary,
  };
};

export const div = function (obj1, obj2) {
  return {
    real: obj1.real / obj2.real,
    imaginary: obj1.imaginary / obj2.imaginary,
  };
};
