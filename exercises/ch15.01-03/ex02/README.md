## 動作確認方法

動的にインポートができているかどうかはブラウザの開発者ツールの「Source」から確認できる。サンプルプログラムではクリック時にimportするような実装になっているため、ボタンをクリック時にusername.jsがsourceとして追加される。

![](./../images/ex02.gif)

またscriptの属性にcrossoriginを追加することでcross-siteの動的インポートになるはず。
