# 問題1 Active や Completed を選択後にブラウザのリロードを行うとどうなるだろうか。hashchange と pushState それぞれの実装について調べなさい

(ヒント: 開発者ツールでどのような通信が発生しているか調べてみなさい)。

## Active や Completed を選択後にブラウザのリロードを行うとどうなるか

Active や Completed を選択後にブラウザのリロードを行うと「404」「The request path could not be found」となり、想定外の動きになる。ネットワークタブで確認したところ「ch15.04-10/ex12/active」もしくは「ch15.04-10/ex12/completed」というパスにファイルを取りに行って、Next.jsが404のページを返してくれている挙動になっている（ように見える）。

## hashchange と pushState それぞれの実装について

hashchange を利用して実装する場合には URL のハッシュが変更された場合に JS ファイルの中でその変更を検知してページの状態を変更するように実装する。一方 pushState は、今回の例ではボタンがクリックされたことをトリガーとしてページの表示を変更している。そのためブラウザの機能である「戻る」と「進む」ボタンを押しても状態が変更されない。また、pushState を実行してもブラウザのリロードは走らず、指定した URL への再読み込みは発生しない。hashchange で実装している ex11 の問題ではハッシュが`active/completed`の状態でリロードするとページ自体は読み込めるが状態が消える。

# 問題2 ここまでの例は [serve](https://www.npmjs.com/package/serve) コマンドで HTML や JS といったファイル配信するサーバーを立ち上げてきた。サーバー側がどのような挙動をすれば pushState を使った実装が期待通り動作するか考えて答えなさい。

サーバー側が`todos`を状態として保持して`active/index.html`と`completed/index.html`というパスのファイルにテンプレートを持っておき、`todos`配列から描画する要素を取り出して描画するような実装にする。
