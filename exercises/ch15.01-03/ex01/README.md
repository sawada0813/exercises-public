# index.html ファイル内の script タグから `type="module"` 属性を削除した場合、期待通り動作させるにはどうすべきか答えなさい。

まず type="module" を消したら起動通りに動作しない。代わりにdefer/async属性をつけることで期待通りに動作させることができる。

type="module" を消して期待通りに動作しないのは、HTML の解析が完了する前にコードを実行するためである。index.html を開くをコンソールに次のエラーが出力されている。form の解析前に addEventListener を実行してしまって index.js はエラーとなってしまっている。

```
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at index.js:5:6
```
