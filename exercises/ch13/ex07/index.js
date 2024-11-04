import {
  wait1,
  wait2,
  wait3,
  errX,
  errY,
  log,
  logA,
  logB,
  logC,
} from "../index.js";

async function h1() {
  // 予想: 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
  // 結果: 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
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
  //                                      logC
  //                                      |-|
  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e) {
    log(e.message);
  }
}

h1();

function h2() {
  // NOTE: h3 との比較用
  // 予想: errX が発生し、その例外が catch され、X が出力される。
  // 結果: errX が発生し、その例外が catch され、X が出力される。
  // 図解:
  // errX
  // |-|
  //    catch
  //   |-|
  //      log(e.message)
  //      |-|
  // 理由: new Promiseコンストラクタの引数は同期的に実行されるため、errX の例外が catch される
  new Promise(() => {
    errX();
  }).catch((e) => log(e.message));
}

function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  // 予想: errX が発生し、その例外が catch され、X が出力される。
  // 結果: errX が発生し、その例外が catch されずに終了する
  // 理由: new Promise コンストラクタの引数は同期的に実行されるため、async関数内で発生した例外は catch されない
  // また、async function は Promise を返し、その Promise が reject されるわけではにないため、catch されない(？)
  new Promise(async () => {
    errX();
  }).catch((e) => log(e.message));
}

async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  // 予想: 2つともcatchできない
  // 結果: 2つともcatchできない
  // 説明: わかりません！

  // 解説: await p1 で errX() の例外を受けて catch 切に入り、 'X' が出力される。
  // errY() 処理されるが、await p2 は実行されないため 'Y' は出力されない。
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}
