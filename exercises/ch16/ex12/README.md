# C10K 問題とは

C10K問題（英語: C10K problem）とは、Apache HTTP ServerなどのWebサーバソフトウェアとクライアントの通信において、クライアントが約1万台に達すると、Webサーバーのハードウェア性能に余裕があるにもかかわらず、レスポンス性能が大きく下がる問題である。

Apacheはクライアントの接続一つ一つに対してプロセスを生成する仕様となっている。そのため大量のクライアントから接続があった場合、その数だけプロセスを生成しなければならない。しかし、WindowsあるいはLinuxなどのUNIX系OSでは、同時に起動できるプロセスに32767(215-1)個の制限がある。この制限を超えるとプロセスを新規生成することができなくなるため、既にあるリクエストの処理が終わるまで新たな接続は待たなければならない。これがC10Kの主な原因である。

nginx のような C10K 問題の対策がされたソフトウェアを使用、もしくは Node.js などの駆動方式を持ったソフトウェアを使用することで対策できる。

- 参考: https://ja.wikipedia.org/wiki/C10K%E5%95%8F%E9%A1%8C