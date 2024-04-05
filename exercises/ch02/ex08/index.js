import { Parser } from "acorn";

export function removeSemicolon(input) {
  let result = input;
  let ast;
  try {
    ast = Parser.parse(input);
  } catch (e) {
    return input;
  }
  let j = 0;
  for (let i = 0; i < ast.body.length; i++) {
    if (
      ast.body[i].type === "VariableDeclaration" ||
      ast.body[i].type === "ExpressionStatement"
      ) {
      const point = ast.body[i].end;
      if (result[point - j + 1] === "(") continue;
      if (result[point - j] === ` `) continue;
      if (result[point - 1 - j] !== ";") continue;
      result = result.slice(0, point - 1 - j) + result.slice(point - j);
      j++;
    }
  }
  return result;
}
