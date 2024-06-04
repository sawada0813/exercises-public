export function add(list1, list2) {
  if (list1.length !== list2.length) {
    throw "invalid list";
  }
  for (let i; i < list1.length; i++) {
    if (list1[i].length !== list2[i].length) {
      throw "invalid list";
    }
  }
  const result = list2.concat();
  for (let i = 0; i < list1.length; i++) {
    for (let j = 0; j < list2.length; j++) {
      result[i][j] = list1[i][j] + list1[i][j];
    }
  }
  return result;
}

export function mul(array1, array2) {
  const result = [];
  const row1 = array1.length;
  const col1 = array1[0].length;
  const col2 = array2[0].length;

  for (var i = 0; i < row1; i++) {
    result.push([]);
    for (var j = 0; j < col2; j++) {
      result[i].push(0);
      for (var k = 0; k < col1; k++) {
        result[i][j] += array1[i][k] * array2[k][j];
      }
    }
  }

  return result;
}
