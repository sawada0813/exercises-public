export function selfMadeAssign(target, source1, source2) {
  for (const key of Object.keys(source1)) {
    target[key] = source1[key];
  }
  if (source2) {
    for (const key of Object.keys(source2)) {
      target[key] = source1[key];
    }
  }
  return target;
}
