export function sample() {
  const sameVariableName = "hoge";
  {
    const sameVariableName = "fuga";
    console.log(sameVariableName);
  }
  console.log(sameVariableName);
}

sample();
