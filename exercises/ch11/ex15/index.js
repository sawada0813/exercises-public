export const modifyUrl = ({ base, addQuery = [], path = "" }) => {
  const url = new URL(base);
  // pathnameは引数で指定されたら上書きする仕様という理解で実装した
  const result = url.origin + (path.replace(".", "") || url.pathname);
  addQuery.forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return result + url.search.toString();
};
