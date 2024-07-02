const obj = {
  om: function () {
    const nest = {
      nm: function () {
        console.log(this === obj, this === nest);
      },
      arrow: () => {
        console.log(this === obj, this === nest);
      },
    };
    nest.nm();
    nest.arrow();
  },
};
obj.om();

// 予想
// false, true
// true, false
// アロー関数以外の入れ子型の関数、つまりnmは外側の this を継承しないため

// 結果
// false, true
// true, false
