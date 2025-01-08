# マルチスレッドについて

並列処理とは複数のタスクを同時に実行し、並行処理は複数のタスクを交互に実行する。マルチスレッドとは、１つのプログラムを複数に分割し、同時に処理を進める技術のこと。この処理は並列処理でも並行処理でも構わない。

参考: https://zenn.dev/chro96/articles/abcda94d41697b

# フィボナッチ数を計算するmFib.jsをスレッド数を変更しながら実行し、コンソール出力とOS機能(\*2)で結果とスレッド数を確認しなさい。

## 環境

macOS Sonoma @ 14.6（23G80）
コアの総数: 12（パフォーマンス: 6、効率性: 6）

## 実験

コア数が12のため1から12まで数を増やして実験する。

実行結果
|スレッド数|計算時間[s]|
|--|--|
|1|15.623|
|2|16.574|
|3|7.792|
|4|8.317|
|5|7.876|
|6|6.325|
|7|6.209|
|8|6.268|
|9|7.418|
|10|6.155|
|11|7.802|
|12|6.113|

スレッド数を2倍にしても実行時間が2倍になるわけでない。

## 考察

コア数が12のため12に近づくにつれて効率よく計算でき計算時間が短くなる。

## 実験結果生データ

```bash
kyoyasawada@USERnoMacBookPro:~/workshop/js/github/exercises-public/exercises (main *)$ node ch16/ex01/mFib.js 45 1
Worker 0 execution time: 15.618s
Total execution time: 15.623s
Fibonacci number: 1836311902
^[[A^C
kyoyasawada@USERnoMacBookPro:~/workshop/js/github/exercises-public/exercises (main *)$ node ch16/ex01/mFib.js 45 2
Worker 0 execution time: 6.183s
Worker 1 execution time: 16.568s
Total execution time: 16.574s
Fibonacci number: 1836311902
^C
kyoyasawada@USERnoMacBookPro:~/workshop/js/github/exercises-public/exercises (main *)$ node ch16/ex01/mFib.js 45 3
Worker 0 execution time: 3.050s
Worker 2 execution time: 5.859s
Worker 1 execution time: 7.786s
Total execution time: 7.792s
Fibonacci number: 1836311902
^C
kyoyasawada@USERnoMacBookPro:~/workshop/js/github/exercises-public/exercises (main *)$ node ch16/ex01/mFib.js 45 4
Worker 0 execution time: 1.707s
Worker 3 execution time: 2.763s
Worker 1 execution time: 7.418s
Worker 2 execution time: 8.310s
Total execution time: 8.317s
Fibonacci number: 1836311902
^C
kyoyasawada@USERnoMacBookPro:~/workshop/js/github/exercises-public/exercises (main *)$ node ch16/ex01/mFib.js 45 5
Worker 2 execution time: 1.220s
Worker 0 execution time: 1.623s
Worker 3 execution time: 2.595s
Worker 1 execution time: 6.999s
Worker 4 execution time: 7.866s
Total execution time: 7.876s
Fibonacci number: 1836311902
^C
kyoyasawada@USERnoMacBookPro:~/workshop/js/github/exercises-public/exercises (main *)$ node ch16/ex01/mFib.js 45 6
Worker 2 execution time: 639.817ms
Worker 0 execution time: 1.194s
Worker 1 execution time: 1.902s
Worker 4 execution time: 2.498s
Worker 3 execution time: 4.745s
Worker 5 execution time: 6.314s
Total execution time: 6.325s
Fibonacci number: 1836311902
^C
kyoyasawada@USERnoMacBookPro:~/workshop/js/github/exercises-public/exercises (main *)$ node ch16/ex01/mFib.js 45 7
Worker 2 execution time: 450.902ms
Worker 0 execution time: 665.366ms
Worker 3 execution time: 1.587s
Worker 1 execution time: 1.667s
Worker 4 execution time: 2.491s
Worker 5 execution time: 3.942s
Worker 6 execution time: 6.197s
Total execution time: 6.209s
Fibonacci number: 1836311902
^[[A^C
kyoyasawada@USERnoMacBookPro:~/workshop/js/github/exercises-public/exercises (main *)$ node ch16/ex01/mFib.js 45 8
Worker 0 execution time: 336.953ms
Worker 1 execution time: 871.833ms
Worker 5 execution time: 913.073ms
Worker 7 execution time: 1.064s
Worker 3 execution time: 1.631s
Worker 4 execution time: 3.927s
Worker 2 execution time: 4.192s
Worker 6 execution time: 6.245s
Total execution time: 6.268s
Fibonacci number: 1836311902
^C
kyoyasawada@USERnoMacBookPro:~/workshop/js/github/exercises-public/exercises (main *)$ node ch16/ex01/mFib.js 45 9
Worker 7 execution time: 337.893ms
Worker 0 execution time: 512.409ms
Worker 2 execution time: 737.204ms
Worker 8 execution time: 755.345ms
Worker 1 execution time: 1.096s
Worker 3 execution time: 1.936s
Worker 4 execution time: 2.547s
Worker 5 execution time: 3.937s
Worker 6 execution time: 7.406s
Total execution time: 7.418s
Fibonacci number: 1836311902
^C
kyoyasawada@USERnoMacBookPro:~/workshop/js/github/exercises-public/exercises (main *)$ node ch16/ex01/mFib.js 45 10
Worker 5 execution time: 208.531ms
Worker 4 execution time: 256.869ms
Worker 6 execution time: 346.613ms
Worker 0 execution time: 503.273ms
Worker 8 execution time: 729.393ms
Worker 2 execution time: 1.038s
Worker 7 execution time: 1.593s
Worker 9 execution time: 2.477s
Worker 1 execution time: 3.913s
Worker 3 execution time: 6.146s
Total execution time: 6.155s
Fibonacci number: 1836311902
^C
kyoyasawada@USERnoMacBookPro:~/workshop/js/github/exercises-public/exercises (main *)$ node ch16/ex01/mFib.js 45 11
Worker 3 execution time: 214.342ms
Worker 8 execution time: 275.2ms
Worker 2 execution time: 326.533ms
Worker 7 execution time: 517.393ms
Worker 9 execution time: 555.211ms
Worker 5 execution time: 867.102ms
Worker 0 execution time: 1.113s
Worker 6 execution time: 2.513s
Worker 1 execution time: 4.387s
Worker 4 execution time: 7.672s
Worker 10 execution time: 7.786s
Total execution time: 7.802s
Fibonacci number: 1836311902
^C
kyoyasawada@USERnoMacBookPro:~/workshop/js/github/exercises-public/exercises (main *)$ node ch16/ex01/mFib.js 45 12
Worker 2 execution time: 152.774ms
Worker 4 execution time: 164.275ms
Worker 7 execution time: 197.522ms
Worker 9 execution time: 239.758ms
Worker 3 execution time: 366.777ms
Worker 11 execution time: 508.011ms
Worker 5 execution time: 741.877ms
Worker 6 execution time: 1.084s
Worker 10 execution time: 1.883s
Worker 1 execution time: 3.205s
Worker 0 execution time: 3.884s
Worker 8 execution time: 6.101s
Total execution time: 6.113s
Fibonacci number: 1836311902
^[[A^C
```
