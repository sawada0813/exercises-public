export function extractOriginalProperty(object) {
  const result = [];
  for (const property in object) {
    if (object.hasOwnProperty(property)) {
      result.push(property);
    }
  }
  return result;
}
