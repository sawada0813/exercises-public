// サロゲートペアを考慮して配列化
// 引数の文字列をサロゲートペアで分離しない
function stringToArray(str) {
  return str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
}

export function reverse(string) {
  const segmenterFr = new Intl.Segmenter("fr", { granularity: "word" });
  const iterator = segmenterFr.segment(string)[Symbol.iterator]();

  // value単位で入れ替え
  const list = [];
  while (true) {
    const next = iterator.next();
    if (next.done) break;
    const segment = next.value.segment;
    list.push(segment);
  }
  list.reverse();
  const string2 = list.join("");

  // valueがisWordLike trueならその中でも並び替え
  const iterator2 = segmenterFr.segment(string2)[Symbol.iterator]();
  let result = "";
  while (true) {
    const next = iterator2.next();
    if (next.done) break;
    const value = next.value;
    const segment = value.segment;
    const segmentList = stringToArray(segment);
    if (value.isWordLike) {
      for (let i = 1; i <= segmentList.length; i++) {
        result += segmentList[segmentList.length - i];
      }
    } else {
      result += value.segment;
    }
  }
  return result;
}
