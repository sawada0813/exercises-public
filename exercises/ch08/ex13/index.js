function f(input) {
  const f = new Function(`return "Hello, ` + `${input}"`);
  console.log(f());
}

f("world");
