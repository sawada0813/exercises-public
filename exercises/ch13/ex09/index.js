import {
  wait,
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

async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  // 予想: Promise.anyは最初の履行値を返すため、1秒後に42が出力され、その2秒後に100が出力される
  // 結果: 1秒後に42が出力され、2秒後に100が出力される
  // 図解:(自信ない)
  // wait1
  // |-----|
  // wait2
  // |-----|            |-----|
  //       log(v) v=42
  //       |-|
  //         wait2
  //         |----------|
  //                          log(v) v=100
  //                          |-|
  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
}

async function i2() {
  // 予想: 1秒後に C → その1秒後に B → その1秒後に A
  // 結果: 1秒後に C → その1秒後に B → その1秒後に A、最後に [ 'A', 'B', 'C' ]
  // 図解:
  // wait3
  // |---------------|
  // wait2
  // |----------|
  // wait1
  // |-----|
  //       logC
  //       |-|
  //            logB
  //            |-|
  //                 logA
  //                 |-|
  //                   log(v) [ 'A', 'B', 'C' ]
  //                   |-|
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}

async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  // 予想: 1秒後に errY() が呼ばれて catch されて Y が出力される。その後の log(v)は 42 が出力され、3秒後に 0 が出力される
  // 結果: Y と 42 がほぼ同時に出力され、1秒後に B、 その2秒後に 0 が出力される
  // 図解:
  // wait1
  // |-----|
  //       errY()→catchされる
  //       |-|
  // wait2
  // |------------|
  //              logB(): ③B
  //              |-|
  // wait3
  // |------------------|
  //                    v=0
  //                    |-|
  //         catch(e)
  //         |-|
  //           log(e.message): ①Y
  //           |-|
  //             log(v): ②42
  //             |-|
  //               wait3
  //               |---------------|
  //                               log(v): ④0
  //                               |-|
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}

async function i4() {
  // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
  // 予想: 5秒後に 0→ 4秒後に 1→ 3秒後に 2→ 2秒後に 3→ 1秒後に 4→COMPLETED
  // 結果: 予想と同じ
  // 図解
  // wait(5000)
  // |-----|
  //       log(0)
  //       |-|
  //       wait(4000)
  //       |----|
  //            log(1)
  //            |-|
  //            wait(3000)
  //            |---|
  //                log(2)
  //                |-|
  //                wait(2000)
  //                |--|
  //                   log(3)
  //                   |-|
  //                     wait(1000)
  //                     |-|
  //                       log(4)
  //                       |-|
  //                         log('COMPLETED')
  //                         |-|
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

async function i5() {
  // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
  // 予想: COMPLETEDだけが出力される
  // 結果: COMPLETED→4→3→2→1→0 の順で1秒おきに出力される
  // 説明: ループ自体が非同期ではなく同期的に実行されてしまい、5つのタイマーがほぼ同時に実行されて直列ではなく並列実行されている
  // 図解:
  // wait(5000)
  // |-----|
  //       log(0) ⑥
  //       |-|
  // wait(4000)
  // |----|
  //      log(1) ⑤
  //      |-|
  // wait(3000)
  // |---|
  //     log(2) ④
  //     |-|
  // wait(2000)
  // |--|
  //    log(3) ③
  //    |-|
  // wait(1000)
  // |-|
  //   log(4) ②
  //   |-|
  // log('COMPLETED') ①
  // |-|

  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

async function i6() {
  // 予想: 4→3→2→1→0→COMPLETED の順で1秒おきに出力される（並列実行される）
  // 結果: 4→3→2→1→0→COMPLETED の順で1秒おきに出力される
  // 図解:
  // wait(1000)
  // |-|
  //   log(4) ①
  //   |-|
  // wait(2000)
  // |--|
  //    log(3) ②
  //    |-|
  // wait(3000)
  // |---|
  //     log(2) ③
  //     |-|
  // wait(4000)
  // |----|
  //      log(1) ④
  //      |-|
  // wait(5000)
  // |-----|
  //       log(0) ⑤
  //       |-|
  //         log('COMPLETED') ⑥
  //         |-|
  return Promise.all(
    [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i))),
  ).then(() => log("COMPLETED"));
}

async function i7() {
  // NOTE: i8 との比較用
  // 予想: 11秒後に 10 が出力される
  // 結果: 11秒後に 10 が出力される
  // 図解:
  // v=0
  // p1
  // wait1()
  // |-|
  //   v=v+1 (v=2)
  //   |-|
  //     wait2()
  //     |--|
  //        v=v+1 (v=4)
  //        |-|
  //          wait2()
  //          |--|
  //             v=v+1 (v=6)
  //             |-|
  //               wait2()
  //               |--|
  //                  v=v+1 (v=8)
  //                  |-|
  //                    wait2()
  //                    |--|
  //                       v=v+1 (v=10)
  //                       |-|
  //                         wait2()
  //                         |--|
  // p2
  // v=v+1 (v=1)
  // |-|
  //   wait2()
  //   |--|
  //      v=v+1 (v=3)
  //      |-|
  //        wait2()
  //        |--|
  //           v=v+1 (v=5)
  //           |-|
  //             wait2()
  //             |--|
  //                v=v+1 (v=7)
  //                |-|
  //                  wait2()
  //                  |--|
  //                     v=v+1 (v=9)
  //                     |-|
  //                       wait2()
  //                       |--|
  //                           log(v=10) ①
  //                           |-|
  let v = 0;

  // 1秒待った後に2秒間隔で value の値を更新
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  // 2秒間隔で value の値を更新
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

async function i8() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  // NOTE: i8 との比較用
  // 予想: 11秒後に 5 が出力される(vはp1とp2で交互に参照、代入が繰り返される。nextはp1,p2内に閉じているため値は変化しない)
  // 結果: 11秒後に 5 が出力される
  // 図解:
  // p1
  // wait1
  // |-|
  //   next=v+1(next=1, v=0)
  //   |-|
  //     wait2
  //     |--|
  //        v=next(next=1, v=1), next=v+1(next=2, v=1)
  //        |-|
  //          wait2
  //          |--|
  //             v=next(next=2, v=2), next=v+1(next=3, v=2)
  //             |-|
  //               wait2
  //               |--|
  //                  v=next(next=3, v=3), next=v+1(next=4, v=3)
  //                  |-|
  //                    wait2
  //                    |--|
  //                       v=next(next=4, v=4), next=v+1(next=5, v=4)
  //                       |-|
  //                         wait2
  //                         |--|
  //                            v=next(next=5, v=5)※p2が先に解決済みのためここで終わり
  //                            |-|
  // p2
  // next=v+1(next=1, v=0)
  // |-|
  //   wait2
  //   |--|
  //      v=next(next=1, v=1), next=v+1(next=2, v=1)
  //      |-|
  //        wait2
  //        |--|
  //           v=next(next=2, v=2), next=v+1(next=3, v=2)
  //           |-|
  //             wait2
  //             |--|
  //                v=next(next=3, v=3), next=v+1(next=4, v=3)
  //                |-|
  //                  wait2
  //                  |--|
  //                     v=next(next=4, v=4), next=v+1(next=5, v=4)
  //                     |-|
  //                       wait2
  //                       |--|
  //                          v=next(next=5, v=5)
  //                          |-|
  //                            log(v=5) ①
  //                            |-|

  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
