## エクスポート元の関数名、クラス名を名前変更

### Nodeのモジュール方式

インポート側は変更なし。インポート側で名前を決めているため。

### ES6のモジュール方式

関数名をrenameしたところ、export時に「名前変更を伴うエクスポート」に書き換えられた。Nodeモジュール方式同様、インポート側に影響なし。

```js
// rename前
export { isAnimal };

// rename後
export { isAnimalClass as isAnimal };
```

再エクスポートをするクラスの名前を変更したところ、再エクスポートするファイルのimport文も書き変わった。

```js
// classes/index.js
// rename前
export { default as Animal } from "./animal.js";

// rename後
export { default as AnimalClass } from "./animal.js";
```

また、`es6/utils.js`で`Animal`クラスをimportする行が書き変わった。（元々は`classses/index.js`からimportしていたが検証向けに書き換えた。）

```js
// rename前
import Animal from "./classes/animal.js";

// rename後
import AnimalRenamed from "./classes/animal.js";
```
