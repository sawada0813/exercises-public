export function* counterGen() {
  let count = 0;
  for (;;) {
    try {
      yield count;
      count++;
    } catch (e) {
      count = 0;
      yield;
    }
  }
}
