## 予想

Hello, world!は出力されない。

## 結果

Hello, world!は出力されない。

## 調査

参考: https://zenn.dev/estra/books/js-async-promise-chain-event-loop/viewer/d-epasync-task-microtask-queues#%E3%83%9E%E3%82%A4%E3%82%AF%E3%83%AD%E3%82%BF%E3%82%B9%E3%82%AF%E3%82%AD%E3%83%A5%E3%83%BC

> マイクロタスクキューはタスクキューよりも優先的に処理されます。単一タスクが終わったら、すべてのマイクロタスクを処理するというのはそういうことです。
> ...
> API や Promise の then() メソッドなどの引数に渡すコールバック関数がマイクロタスクとして扱われます。

1. 1行目のセットタイムアウト（タイマーが開始される）
2. longRunningButAsyncFunction()内の await で実行されるタスクがマイクロタスクとしてスタックに積まれる
3. whileが無限ループがタスクとして扱われ、結局これが終わらないことにはマイクロタスクは実行されないし、1のコンソールログ出力処理されない