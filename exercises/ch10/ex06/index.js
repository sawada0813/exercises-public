console.log("before import");
import "./unexport.js";
import "./unexport.js";
import "./unexport.js";
console.log("after import");

// 予想
// unexport.js
// before import
// after import

// 実行結果
// unexport.js
// before import
// after import

// 考察
// 書籍に記載されている通り複数回記載しても1度しか実行されない
// またimport分は巻き上げられるため他のコンソール出力よりも先に実行される
