export function bitCount(a) {
  let count = 0
  const stringA = a.toString(2)
  for (const i of stringA) {
    if (i == '1') count += 1
  }
  return count
}