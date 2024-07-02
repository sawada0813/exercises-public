export const repeatAndCollect = (n, c) => {
  if (typeof n !== "number" || n <= 0 || Math.floor(n) !== n)
    throw "args n is invalid";
  if (typeof c !== "string") throw "args c is invalid type";
  const result = [];
  for (let i = 1; i <= n; i++) {
    console.log(c);
    result.push(c);
  }
  return result;
};

// 引数が1つのため、引数の括弧を省略
// 本体がreturn文のみのため中括弧を省略
// 出題者の意図でバリデーションは不要だと解釈して書いていない
export const squared = (x) => x ** 2;

// 本体がreturn文のみのため中括弧を省略
export const generateNow = () => ({ now: Date.now() });
