1. index.js で`document.cookie` プロパティを `console.log`で表示する

### 結果

何も出力されない。DOMContentLoaded と submit のイベントハンドラ等に仕込んで実験したが文字列は出力されない。

### 説明

HttpOnly が設定されている場合は document.cookie でクッキーを取得はできない。HttpOnly が設定された cookie はWebサーバーとブラウザの間のHTTPリクエストとレスポンスでのみ利用が可能になり、クライアントサイドのスクリプトからは読み込んだり書き換えたりできない。

参考：https://zenn.dev/yukionodera/articles/why-cannot-read-cookie

1. ブラウザの開発者コンソールで http://localhost:3000/ の Cookie を表示する

### 結果

cookie が表示された。cookie には「sid: 43fcbfff-92d5-41d9-8d38-6ff4101a4406」「Domain: localhost」「Path: /」「Expires: セッション」「サイズ: 39」「HttpOnly」「SameSite: Lax」「Priority: Medium」の値が格納されている。

### 説明

上の説明と重複するがHTTPリクエストとレスポンスではcookieを使用しているためブラウザの開発者コンソールには表示される。

1. ToDo アプリのタブをリロードする

### 結果

ToDoアプリの状態(チェックボックスやリストの内容)はリロード前と同じものが表示される。また、Cookie はリロード前と同じsidで同じ値が入っている。

### 説明

CookieのExpiresがセッションになっているのでセッションのライフサイクルにCookieが依存する。つまりセッションが切れればアプリの状態は変化（リセット）する。セッションのライフサイクルはブラウザに依存する。

1. 同一ブラウザの異なるタブやウィンドウで http://localhost:3000/ を開いて ToDo リストの状態を確認する

### 結果

全て同じToDoリストの状態で表示された。

### 説明

セッションが同一ブラウザであればウィンドウやタブが異なっていても同一セッションとして扱われているため状態が保持される。

1. シークレットウィンドウや異なるブラウザで http://localhost:3000/ を開いて ToDo リストの状態を確認する

### 結果

ToDoリストは初期状態になる。

### 説明

異なるブラウザは別セッションとして扱われていると思われる。また同一ブラウザでもシークレットウィンドウとそうでないウィンドウ間ではセッションは共有されない。

質問：シークレットウィンドウはリロードしたら状態が保持された。シークレットウィンドウはクッキーを保持できないと思っていたが何故か？リロードしてもsidは変化しなかったため、同一セッションとして扱われていると思われる。

1. http://127.0.0.1:3000/ を開いて ToDo リストの状態を確認する

### 結果

ToDoリストは初期状態になる。

### 説明

localhostとはオリジンが異なるため異なるクッキーが使われている。異なるオリジン間でクッキーを共有できるとログイン情報などが漏洩するリスクが高まる。