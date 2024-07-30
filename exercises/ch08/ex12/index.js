export function f(args) {
  return new Function(
    `...argsList`,
    `if (argsList.length===0) return ` +
      args +
      `;
    const argsString = "` +
      args +
      `";
    const argsStringList = argsString.split(" ");
    let result = "";
    let index = 0;
    argsStringList.forEach((arg) => {
      if (arg.indexOf("$") === -1) result += arg;
      else {
        result += arg.replace("$" + (index + 1), argsList[index]);
        index++;
      }
    });
    try {
      return eval(result);
    } catch (e) {
      return result.replaceAll("+","")
    }`,
  );
}
