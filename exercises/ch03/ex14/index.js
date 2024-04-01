export function eq(a, b) {
  let x;
  let y;
  if (a === undefined || b === undefined) {
    if (a === undefined) {
      x = NaN;
    } else if (a === null) {
      x = 0;
    }
    if (b === undefined) {
      y = NaN;
    } else if (b === null) {
      y = 0;
    }
  } else {
    if (a.toString() === "[object Object]") {
      x = a.valueOf();
    } else {
      x = Number(a);
    }
    if (b.toString() === "[object Object]") {
      y = b.valueOf();
    } else {
      y = Number(b);
    }
  }
  if (Object.prototype.toString.call(a) === "[object Date]") {
    x = a.toString();
  }
  if (Object.prototype.toString.call(b) === "[object Date]") {
    y = b.toString();
  }
  return x === y;
}

export function lte(a, b) {
  // TODO: ここを実装しなさい
  return false;
}
