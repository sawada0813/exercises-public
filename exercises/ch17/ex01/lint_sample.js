let a, x, y;
const r = 10;

// with (Math) {
//   a = PI * r * r;
//   x = r * cos(PI);
//   y = r * sin(PI / 2);
// }

const PI = Math.PI;
const cos = Math.cos;
const sin = Math.sin;

a = PI * r * r;
x = r * cos(PI);
y = r * sin(PI / 2);

console.log(a, x, y);
