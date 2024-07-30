export const isEmailAddress = (str) => {
  if (str == null || str == undefined) return false;
  if (!str.includes("@")) return false;
  if (str.split("@")[0].length >= 65) return false;
  if (str.split("@")[1].length >= 253) return false;
  // ^(?!^\.): 先頭のドットを許可しない
  // (?!.*\.\.): 連続するドットを許可しない
  // (?!.*\.$): 末尾のドットを許可しない
  // [a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$: ローカル部の正規表現
  const localPartRegex =
    /^(?!^\.)(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9-.!#$%&'*+/=?^_`{|}~-]+$/;

  const domainPartRegex =
    /^(?!^\.)(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9-.!#$%&'*+/=?^_`{|}~-]+$/;

  return (
    localPartRegex.test(str.split("@")[0]) &&
    domainPartRegex.test(str.split("@")[1])
  );
};

// メモ: ローカル部@ドメイン（例：foo@example.com）
