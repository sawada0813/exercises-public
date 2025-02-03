# package-lock.json

## 役割

package-lock.jsonには`npm install`でインストールしたパッケージのバージョンなどの情報が記載されている。package.jsonはインストールすべきパッケージのバージョンの範囲が記載されている点が異なる点の一つ。`npm install`の代わりに`npm ci`を実行するとpackage-lock.jsonを元にインストールされる。

## リポジトリにコミットすべきか

コミットすべき。新規の開発者が`git clone`して動作確認する際には`npm ci`を用いることで、node_modulesの内容が同じ状態で動作確認をすることができる。またCI実行時に`npm ci`を実行することも一般的なユースケースの一つである。

## 参考

- https://qiita.com/sugurutakahashi12345/items/1f6bb7a372b8263500e5
