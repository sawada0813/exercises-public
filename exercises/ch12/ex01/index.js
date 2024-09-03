function counterIter(max) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

function* counterGen(max) {
  console.log("counterGen");
  try {
    // throw new Error("error"); → 当然だがcatchされる
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
  } finally {
    console.log("counterGen: finally");
  }
}

// 明示的に[イテレータインタフェース](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-iteration) のメソッドを呼んだり、間接的に呼んだりする
const iter = counterIter(3);
console.log(iter.next());
// counterIter: next
// { value: 1, done: false }
console.log(iter.return("done"));
// counterIter: return: done
// { value: 'done', done: true }
try {
  console.log(iter.throw("error"))
} catch (e) {
  console.log(e)
}
// counterIter: throw: error
// error

// - ジェネレータ関数によって生成されたオブジェクトが[イテレータインタフェース](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-iteration)を満たしていることを確認する
const generator = counterGen(3);
console.log(generator.next());
// counterGen: next
// { value: 1, done: false }
console.log(generator.return("done"));
// counterGen: finally
// { value: 'done', done: true }
try{
  console.log(generator.throw('error'))
} catch (e) {
  console.log(e)
}
// error

// ループの途中でbreakするとreturn()が呼ばれる
for (const iter of counterIter(3)) {
  console.log(iter)
  break
}
// counterIter
// counterIter: Symbol.iterator
// counterIter: next
// 1
// counterIter: return: undefined ←ココ

for (const gen of counterGen(3)) {
  console.log(gen)
  break
}
// counterGen
// counterGen: next
// 1
// counterGen: finally


// わからなかったこと
// イテレータのthrow()メソッド、イテレータを呼び出す側から明示的に呼ぶ以外の呼び出す方法があるのかどうか
// ジェネレータ関数のthrow()メソッドを、ジェネレータを呼び出す側から明示的に呼ぶ以外の呼び出す方法があるのかどうか
