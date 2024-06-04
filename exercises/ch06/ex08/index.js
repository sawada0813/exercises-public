export function restrict(target, template) {
  for (const checkProperty in target) {
    if (!template.hasOwnProperty(checkProperty)) {
      delete target[checkProperty];
    }
  }
  return target;
}

export function substract(target, ...sources) {
  if (target == {}) return {};
  if (Array.isArray(sources)) {
    // sourceが配列で渡された場合
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];
      for (const deleteProperty in source) {
        // 取り出したプロパティが継承オブジェクトなら削除対象から外す
        if (!source.hasOwnProperty(deleteProperty)) continue;
        if (target.hasOwnProperty(deleteProperty)) {
          delete target[deleteProperty];
        }
      }
    }
  } else {
    for (const deleteProperty in sources) {
      // 取り出したプロパティが継承オブジェクトなら削除対象から外す
      if (!sources.hasOwnProperty(deleteProperty)) continue;
      if (target.hasOwnProperty(deleteProperty)) {
        delete target[deleteProperty];
      }
    }
  }
  return target;
}
