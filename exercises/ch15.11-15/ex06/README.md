## localStorage と sessionStorage それぞれに保存されたデータの有効期限がどのように異なるか、実際に動作確認して結果を記述しなさい

まず書籍は次のような違いが記載されている。

> sessionStorage を使って保存されたデータの有効期間は、データを保存したスクリプトが実行されている最上位ウィンドウやブラウザと同じになります。ウィンドウやタブが閉じられたときは、sessionStorage　を使って保存されたデータは削除されます。

次の環境で確認する

- MacOS Sonoma @ 14.6（23G80）
- Chrome @ 131.0.6778.86

`contents/index.js`の`localStorage`を`sessionStorage`にreplaceした。

### 動作確認

ToDoリストにアイテムをつかした後に一度タブを閉じで再度開き直したところ初期状態になっており、閉じる前のsessionStorageの有効期限が切れたと思われる。また、複数のタブで開いているときはタブごとに状態が異なるため、sessionStorageのスコープが異なっていると思われる。
