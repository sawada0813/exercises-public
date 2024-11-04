## グローバルオブジェクトを参照する方法を、ブラウザ内、node内、ブラウザnode問わずの３種記しなさい。

ブラウザでは`window`がグローバルオブジェクトになる。nodeでは`global`がグローバルオブジェクトになる。`globalThis`はブラウザnode問わず使用できる（2020年初頭以降）。（書籍3.7参照）

## また、ブラウザとnodeのグローバルオブジェクトのプロパティやメソッドを比較し、ブラウザ独自のものを10程度記しなさい。

windowオブジェクト固有のものとして10個あげる。

1. window.caches
2. window.closed
3. window.cookieStore
4. window.document
5. window.devicePixelRatio
6. window.alert()
7. window.blur()
8. window.close()
9. window.confirm()
10. window.postMessage()

Webブラウザとnodeの違いなので、前者特有のものはウィンドウ操作で使いそうなメソッドや取得できそうなプロパティの値が独自のものとして実装されていそうな印象。

## 最後に、グローバルオブジェクトにundefinedが定義されていることを確認し、過去のES仕様でどのような問題が発生していたかを記しなさい。

ES3の仕様ではundefinedが変数として上書き可能であったため、再代入されてしまうリスクがあったが、ES5ではグローバルオブジェクトのundefinedが設定不可、書き込み不可のプロパティとなり再代入のリスクが減った。
