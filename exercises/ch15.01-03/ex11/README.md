## ボタン押下時のコンソール出力結果
「div」→「button」の順に出力された。

## captureの値を変更しdivとbuttonのコンソール出力順序が逆になることを確認しなさい
captureをtrueに設定すると「キャプチャリングイベントハンドラ」として登録される（バブリングイベントと反対の動きをする）。divのclickイベントのリスナーのcaptureをfalseに設定することで「div」→「btn」の順にイベントが伝播し、イベントハンドラ（コンソール出力）が呼ばれる順番が逆（「button」→「div」）になることを確認した。

## ラウザのデバッグツール(Chromeの場合はDeveloper ToolのEvent Listeners)で、btn等に登録されているイベントをそれぞれ確認しなさい
- divのcaptureをfalseに設定した場合
  - btnのclickイベント
    - divのuseCaptureはfalse
    - buttonのuseCaptureはfalse
- divのcaptureをtrueに設定した場合
  - btnのclickイベント
    - divのuseCaptureはtrue
    - buttonのuseCaptureはfalse

(body要素には伝播しないのか、と思った)