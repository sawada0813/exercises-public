## React
業務でReactをしようしているため、Reactを使う際にどのようにXSS対策がされているか、またどのようなリスクが残るかを調査する。

## ReactのXSS対策
ReactのJSX内の式埋め込みでは、基本的にHTMLとして解釈されないようエスケープされている。そのため悪意のあるユーザがテキストフィールド等にHTMLのスクリプトを書いてDOMに追加してもエスケープされるためスクリプトは走らない。

しかしエスケープを無効化する設定が可能であり、無効化した場合はXSS攻撃のリスクが発生する(dangerouslySetInnerHTML)。極力使うべきではない。
さらに、href属性は先頭が`javascript:`から始まる場合はそれ以降の文字列をjavascriptととして実行するため、ユーザが入力した値が直接href属性に仕込まれるような実装の場合はXSSのリスクが発生してしまうため避けるべきである。

### 参考
- Reactで発生しうるXSS脆弱性 https://qiita.com/kazzzzzz/items/897f8ed89ca36a0734de