export function deleteOdd(obj) {
  const result = {};
  for (const i in obj) {
    if (obj[i] % 2 == 0) result[i] = obj[i];
  }
  return result;
}
