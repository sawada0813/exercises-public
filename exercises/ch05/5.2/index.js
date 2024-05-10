export function replaceWithIf(paramString) {
  let result = paramString;
  if (paramString.includes("\0")) result = result.replaceAll("\0", "\\0");
  if (paramString.includes("\b")) result = result.replaceAll("\b", "\\b");
  if (paramString.includes("\n")) result = result.replaceAll("\n", "\\n");
  if (paramString.includes("\v")) result = result.replaceAll("\v", "\\v");
  if (paramString.includes("\f")) result = result.replaceAll("\f", "\\f");
  if (paramString.includes("\r")) result = result.replaceAll("\r", "\\r");
  if (paramString.includes('"')) result = result.replaceAll('"', '\\"');
  if (paramString.includes("'")) result = result.replaceAll("'", "\\'");
  return result;
}

export function replaceWithSwitch(paramString) {
  let result = "";
  for (const str of paramString) {
    switch (str) {
      case "\0":
        result += "\\0";
        break;
      case "\b":
        result += "\\b";
        break;
      case "\n":
        result += "\\n";
        break;
      case "\v":
        result += "\\v";
        break;
      case "\f":
        result += "\\f";
        break;
      case "\r":
        result += "\\r";
        break;
      case '"':
        result += '\\"';
        break;
      case "'":
        result += "\\'";
        break;
      default:
        result += str;
    }
  }
  return result;
}
