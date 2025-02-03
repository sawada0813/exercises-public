# npx

## npx とは

npx とは node package executer の略でパッケージの実行ツールである。npm との違いはインストールされていないパッケージを自動でインストールして実行し、最後にそのパッケージをアンインストールで削除する。

## 使用例

create-react-app で React のアプリケーションを開発する際に npx を使用するのが定番となっている。

```bash
npx create-react-app my-app
```

上記のコマンドを実行すると一時的に create-react-app というパッケージをインストールして実行して my-app という名前のアプリケーションを作成し、、最後に create-react-app をアンインストールする。

## 利点

1. 一時的なパッケージのインストールと実行ができる
   create-react-app のようにアプリとは本来関係のないパッケージを一時的にインストールすることで環境の整理ができる（create-react-app は一時的に環境構築をするためだけのためのパッケージはそれ以降使用することはないので削除することが望ましい）。
2. 実行するパッケージのバージョンを指定して実行できる
   実行後にアンインストールして package.json を変更せず環境を壊さないため、一時的に特定のパージョンのパッケージを利用することができる。

### 参考

- https://qiita.com/kohta9521/items/ee3ed4a2360add80ad79
- https://www.geeklibrary.jp/counter-attack/npx/
- https://qiita.com/Yuu_tsm/items/2e8953d218a309b46144
