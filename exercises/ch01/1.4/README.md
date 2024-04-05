## 開発者ツールを開いた状態のタブで HTML を開く場合

answer:42
answer:0

## HTML を開いた状態のタブで開発者ツールを開く場合

answer:42
answer:0

開いた瞬間にconsole.log()が呼ばれているためその時のlifeの値を参照している。
↓を参考に修正
https://developer.mozilla.org/en-US/docs/Web/API/console/log_static#logging_objects
