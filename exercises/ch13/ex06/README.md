## jQuery Deferred とは

jQueryのバージョン1.5から導入された、非同期処理を扱うための標準モジュールである。次のような効果を見込める。

1. 非同期処理を連結する際、コールバック地獄から解放される
2. エラー処理を簡素化
3. 一連の非同期処理を関数化して利用しやすくできる

- 参考: https://techblog.yahoo.co.jp/programming/jquery-deferred/

## Promise との関係性

jQuery DeferredはPromiseオブジェクトに対応するDeferredオブジェクトを使用する。Promiseではthen, catch, finallyを使用するが、Deferredオブジェクトではdone, fail, alwaysというメソッドを使用する。resolveとrejectについてはDeferredでも同じ名前のメソッドを持つ。

jQuery Deferredは内部でPromiseオブジェクトを保持しており、Deferredオブジェクト生成時に自動的にPromiseオブジェクトが内部生成される。jQueryで使用できる非同期関数はDeferredで実装されている。

次にコードの例を示す。

```javascript
var promise = delayHello();
promise.done(function () {
  /* resolvedで実行 */
});
promise.fail(function (e) {
  /* rejectedで実行 */
});
```

promiseオブジェクトが resolvedになるとdone()に登録したコールバックが実行される（addEventListenerと似ている…？）。thenを使うとresolvedとrejectedを同時に登録できる。

```javascript
delayHello().then(
  function () {
    /* resolvedで実行 */
  },
  function (e) {
    /* rejectedで実行 */
  },
);
```

jQuery Deferred の内部のPromiseとは、今勉強しているPromiseとは別物です。歴史的にPromiseの方が後に登場しています。