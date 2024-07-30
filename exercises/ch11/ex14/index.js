const sortJapanese = (array) => {
  return array.sort(Intl.Collator("ja", { sensitivity: "base" }).compare);
};

const toJapaneseDateString = (date) => {
  return new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
    dateStyle: "medium",
  }).format(date);
};

export { sortJapanese, toJapaneseDateString };
