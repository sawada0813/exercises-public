function* sequence(...iterables) {
  for (const iterable of iterables) {
    for (const element of iterable) {
      yield element;
    }
  }
}


function* overlapSequence(...iterables) {
  yield* sequence(iterables);
}


console.log(overlapSequence([1, 2, 3], [4, 5, 6], [7, 8, 9]).next().value); // 1