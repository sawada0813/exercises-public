# [date-fns](https://github.com/date-fns/date-fns)

## ディレクトリ構成

`src`直下ではdate-fnsが提供するメソッドごとにディレクトリが存在する。また、各ディレクトリの中身は`index.ts`と`test.ts`の２ファイルのみになっているため、`src`直下は提供するメソッドごとにモジュールが分割されているとも言える。またざっとみた限りでは`index.ts`ファイル1つにつき1つの関数もしくはクラスがexportされている。
`src/index.ts`は`src`配下の再エクスポートが実装されているのみで、他には何もしていない。`src/fp/`配下はカリー化をサポート関数プログラミングに適した関数を提供するため、`src`配下とほぼ同じ構成になっている。

### 参考

- https://date-fns.org/docs/Getting-Started
- https://qiita.com/charon1212/items/5c68f408e1ea4b5e8da9
- https://github.com/date-fns/date-fns/blob/main/docs/fp.md

# wip [Luxon](https://github.com/moment/luxon)

`src/luxon.js`で再エクスポートしている。その他の`src`直下にはテストのファイルはなく、リポジトリのルートディレクトリにテスト用のディレクトリがある。`src/impl`配下には12ファイル存在し、それぞれのファイルの中に複数の関数もしくはクラスが定義されexportされている。

# [Day.js](https://github.com/iamkun/dayjs)

上2つと異なり再エクスポートしておらず、`src/index.js`で`dayjs`オブジェクトに機能をまとめて丸ごとエクスポートしている。`src/locale`配下にローケル用のファイルが地域ごとに用意されている。
`src/plugin`配下には提供されているプラグインメソッドごとにディレクトリおよびモジュールが分割されており、`src/index.js`の`dayjs`に直接定義している(L448-L454)。
