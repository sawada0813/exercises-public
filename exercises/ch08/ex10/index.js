export function addMyCall(f) {
  return {
    myCall: function (o) {
      return f.bind(o);
    },
  };
}
