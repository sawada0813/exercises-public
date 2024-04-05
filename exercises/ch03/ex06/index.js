export function substring(str, indexStart, indexEnd) {
  let result = "";
  if (indexEnd === null || indexEnd === undefined) {
    for (let i = 0; i < str.length; i++) {
      if (indexStart <= i) {
        result += str[i];
      }
    }
    return result;
  }
  if (isNaN(indexEnd)) {
    for (let i = 0; i < str.length; i++) {
      if (i < indexStart) {
        result += str[i];
      }
    }
    return result;
  }
  if (isNaN(indexStart)) {
    for (let i = 0; i < str.length; i++) {
      if (i < indexEnd) {
        result += str[i];
      }
    }
    return result;
  }
  indexStart = Math.trunc(indexStart);
  indexEnd = Math.trunc(indexEnd);
  if (indexStart === indexEnd) {
    return "";
  }
  if (indexEnd < indexStart) {
    [indexEnd, indexStart] = [indexStart, indexEnd];
  }
  for (let i = 0; i < str.length; i++) {
    if (indexStart <= i && i < indexEnd) {
      result += str[i];
    }
  }
  return result;
}

export function slice(str, indexStart, indexEnd) {
  let result = "";
  if (indexStart === undefined && indexEnd === undefined) {
    return str;
  }
  if (indexEnd === undefined) {
    if (indexStart < 0) {
      for (let i = 0; i < str.length; i++) {
        if (str.length + indexStart <= i) {
          result += str[i];
        }
      }
    } else {
      for (let i = 0; i < str.length; i++) {
        if (indexStart <= i) {
          result += str[i];
        }
      }
      return result;
    }
  }
  if (indexStart < 0) {
    indexStart += str.length;
  }
  if (indexStart < -str.length || isNaN(indexStart)) {
    indexStart = 0;
  }
  if (str.length <= indexStart) {
    return "";
  }
  if (indexEnd < 0) {
    indexEnd += str.length;
  }
  indexStart = Math.trunc(indexStart);
  indexEnd = Math.trunc(indexEnd);
  for (let i = 0; i < str.length; i++) {
    if (indexStart <= i && i < indexEnd) {
      result += str[i];
    }
  }
  return result;
}

export function padStart(str, targetLength, padString) {
  let result = "";
  if (padString === undefined) {
    padString = " ";
  }
  for (let i = 0; i < (targetLength - str.length) / padString.length; i++) {
    result += padString;
  }
  if (targetLength < result.length + str.length) {
    return substring(result, 0, targetLength - str.length) + str;
  }
  result += str;
  return result;
}

export function trim(str) {
  return str.replace(/^[\s　]+|[\s　]+$/g, "");
}
