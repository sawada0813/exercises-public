class Hiragana {
  constructor(hiragana) {
    // ここでひらがなかどうかのバリデーションが欲しかった
    this.hiragana = hiragana;
    this.utf16code = hiragana.charCodeAt(0);
  }
  [Symbol.toPrimitive](hint) {
    if (hint === "string" || hint === "default") {
      return this.hiragana;
    } else {
      return this.utf16code;
    }
  }
}

export default Hiragana;
