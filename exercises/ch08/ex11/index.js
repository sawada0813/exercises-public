console.log(Object.toString());
// function Object() { [native code] }

function sampleFunc() {}
console.log(sampleFunc.toString());
// function sampleFunc () {}

const sampleArrowFunc = () => {};
console.log(sampleArrowFunc.toString());
// () => {}
