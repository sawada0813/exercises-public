export function fibWithWhile() {
  const result = [1, 1]
  let i = 2
  while(i<10){
    result[i] = result[i-2] + result[i-1]
    i++
  }
  return result
}
export function fibWithDoWhile() {
  const result = [1, 1]
  let i = 2
  do {
    result[i] = result[i - 2] + result[i - 1]
    i++
  } while (i < 10)
  return result
}
export function fibWithFor() {
  const result = [1, 1]
  for (let i=2; i<10; i++) result[i] = result[i - 2] + result[i - 1]
  return result
}