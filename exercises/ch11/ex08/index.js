console.log("aaaa!".match(/^(a|aa)+$/));
console.log(
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!".match(/^(a|aa)+$/),
);

// バックトラッキングが発生するため、計算量が想定以上に増える
// 以下のサイトでステップ数を確認できる
// https://regex101.com/#pcre
// 参考)aaaaa!は92ステップ

// > *や+は、まずは最大限マッチする範囲を広げて、つぎのパターンマッチを考え、ダメだったらひとつ範囲を狭めて再度やり直すわけです。
// 参考)https://qiita.com/mochizukikotaro/items/d36e61e56220da5f95d1#%E3%83%90%E3%83%83%E3%82%AF%E3%83%88%E3%83%A9%E3%83%83%E3%82%AFbacktrack%E3%81%A8%E5%87%BA%E4%BC%9A%E3%81%84%E3%81%BE%E3%81%97%E3%81%9F
