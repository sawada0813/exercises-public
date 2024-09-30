## クリックジャッキング
クリックジャッキングとは、Webサイト上に隠蔽・偽装したリンクやボタンを設置し、サイト訪問者を視覚的に騙してクリックさせるなど意図しない操作をするよう誘導させることである。

## 現象
今回のようにiframeでYouTubeを埋め込んだところ次のエラーがコンソールに出力された。
```
Refused to display 'https://www.youtube.com/' in a frame because it set 'X-Frame-Options' to 'sameorigin'.
```

X-Frame-OptionsとはX-Frame-Options は HTTP のレスポンスヘッダーで、ブラウザーがページを <frame>、<iframe>、<embed>、<object> の中に表示することを許可するかどうかを示すために使用する。今回は'sameorigin'が設定されているため同一オリジン以外からframeやiframeを読み込むことが許可されておらず表示に失敗している。

## 同一オリジンポリシーがなく、iframe内の他サイトのDOM変更が可能な場合のリスク
攻撃者が悪意のあるスクリプトをiframe内に挿入することができてしまう(XSS攻撃)。iframeで読み込むサービスにユーザが事前にログインした状態でiframeを表示させてDOMを操作することで意図しない操作をさせることができる。もしくはiframe内でログインさせることでアカウントの認証情報を取得させることができる。