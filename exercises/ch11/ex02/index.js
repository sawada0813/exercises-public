// f はオブジェクトを1つ引数に取る関数
function cache(f) {
  // この関数を実装する
  const cache = new WeakMap();
  return (obj) => {
    if (cache.has(obj)) {
      return cache.get(obj);
    } else {
      const result = f(obj);
      cache.set(obj, result);
      return result;
    }
  };
}

function slowFn(obj) {
  // 時間のかかる処理
  let result = "";
  for (let i = 0; i < 1000000; i++) {
    result += obj.toString();
  }
  return result;
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
const cachedSlowFn = cache(slowFn);

export { slowFn, cachedSlowFn };
