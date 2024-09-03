import {
  log,
  logA,
  logB,
  logC,
  wait,
  wait1,
  wait2,
  wait3,
  errX,
  errY,
} from "./../index.js";

function f1() {
  // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
  //
  // 回答:
  // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
  //
  // 説明:
  // wait3 の解決後に logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されるため。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                                 wait1
  //                                |-----|
  //                                       logC
  //                                      |-|
  wait3()
    .then(logA)
    .then(() => wait2().then(logB))
    .then(() => wait1().then(logC));
}

function f2() {
  // NOTE: 2つ目の then の中で return が無くなっていることに注意 (典型的なミス)
  //
  // 解答例:
  // 3秒後に A が出力され、その1秒後に C が出力され、その1秒後に B が出力される。
  // 2つ目の .then のコールバック関数が値を return していないため、この .then が返す Promise は即解決される。
  // このため logA() の実行すぐ後に wait1().then(...) が実行され C が先に出力される。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                  wait1
  //                 |-----|
  //                        logC
  //                       |-|
  wait3()
    .then(logA)
    .then(() => {
      wait2().then(logB);
    })
    .then(() => wait1().then(logC));
}

function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  //
  // 回答:
  // すぐにlogAでAが出力され、catch内のlogBでBが出力され、最後にlogCでC出力される。（キャッチできる）
  //
  // 結果: C, A
  // thenのコールバック内の例外は try/catch ではキャッチできない
  //
  // 図解:
  // logC
  // |-|
  //   logA
  //   |-|
  //     wait(0)
  //     |-|
  //       logB
  //       |-|
  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}

function f4() {
  // NOTE: f5 との比較用
  //
  // 回答:
  // 2秒後にlogAでAを出力、1秒後にlogBでBを出力、最後に100を出力
  //
  // 結果:
  // A B 100
  //
  // 図解:
  // wait2()
  // |----------|
  //           logA
  //          |-|
  //             wait(1000)
  //            |------|
  //                    logB
  //                  |-|
  //                    log(v=100)
  //                   |-|

  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      }),
    )
    .then((v) => log(v));
}

function f5() {
  // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
  //
  // 回答:
  // 2秒後にlogAでAを出力、1秒後にlogBでBを出力して終わり。最後のthenは実行されない
  //
  // 結果:
  // B A 40
  //
  // 図解:
  // wait2()
  // |----------|
  //           wait1()
  //            |------|
  //                 logB (ここが関数ではないため、この時点で解決される)
  //                   |-|
  //                     logA
  //                     |-|
  //                      log(v=40) (1つ目のthenの戻り値が引数に渡される)
  //                       |-|
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then(
      wait1().then(() => {
        logB();
        return 100;
      }),
    )
    .then((v) => log(v));
}

function f6() {
  // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか
  // 予想:
  // 1秒後に A が出力され、その1秒後に B が出力され、その2秒後に C が出力される。
  // 結果
  // A B C(1秒おきに出力される)
  // 図解:
  // wait1
  // |-----|
  //        logA
  //       |-|
  //          wait1
  //         |-----|
  //               logB
  //               |-|
  //          wait2
  //         |-----------|
  //                     logC
  //                     |-|

  const p = wait1().then(logA);
  p.then(() => wait1()).then(logB);
  p.then(() => wait2()).then(logC);
}

function f7() {
  // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
  // (= 解決済みの Promise の then を呼び出すとどうなるか)
  // 予想: 3秒後に A B C が出力される。
  // 結果: 1秒後にA、その後1秒後にB,Cが出力される
  // 図解:
  // wait1
  // |-----|
  //        logA
  //       |-|
  // wait2
  // |-----------|
  //              logB
  //             |-|
  //                logC
  //               |-|
  // 解決済みの Promise の then を呼び出すと、その時点で解決済みの Promise が返されるため
  // wait1とwait2はほぼ同時に実行される
  const p = wait1().then(logA);
  wait2()
    .then(() => {
      return p.then(logB);
    })
    .then(logC);
}

function f8() {
  // NOTE: f9, f10 との比較用
  // 予想: 1秒後に errX が発生し、キャッチされて X が出力され、logAでAが出力される。errYは無視される
  // 結果: 1秒後に X と A が出力される
  // 図解
  // wait1
  // |-----|
  //        errX
  //       |-|
  //          catch((e) => log(e.message))
  //         |-|
  //           logA
  //          |-|
  wait1()
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f9() {
  // NOTE: f12 との比較用
  // 予想: 1秒後に errY が発生し、キャッチされて Y が出力され、logAでAが出力される
  // 結果: 1秒後に Y と A が出力される
  // 図解
  // wait1
  // |-----|
  //        () => 42
  //       |-|
  //          errY
  //         |-|
  //            catch((e) => log(e.message))
  //           |-|
  //             logA
  //             |-|
  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  // 予想: 1秒後に errY が発生し、logAでAが出力される。then(r, c) の c が呼ばれない。
  // 結果: 1秒後に A が出力され、errY が発生する
  // 解説: then(r, c) の c は r が失敗した場合に呼ばれわけではなく、その前の then で失敗した場合に呼ばれる
  // 書籍にはthen(null, c) と catch(c) が等しいと記載されている
  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}

function f11() {
  // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
  // 予想: できる。X が出力される。
  // 結果: できる。X が出力される。
  // 解説： new Promise 内で throw したら .catch でキャッチできるため
  new Promise((resolve, reject) => {
    errX();
  }).catch((e) => log(e.message));
}

function f12() {
  // new Promise 内だがコールバック関数で throw した場合は？
  // 予想: できない。エラーが発生して何も出力されない。
  // 結果: できない。エラーが発生して何も出力されない。
  // 解説: new Promise 内のコールバック関数内で発生した例外は、Promise コンストラクタのスコープがで発生するため reject として扱われない
  // そのため、catch でキャッチできない。明示的に reject する必要がある
  new Promise((resolve, reject) => {
    setTimeout(() => errX(), 0);
    // setTimeout(reject(new Error("error")), 0) // これは catch できる
  }).catch((e) => log(e.message));
}

// f3()
// f4()
// f5()
// f6()
// f7()
// f8()
// f9()
// f10()
// f11()
// f12()
