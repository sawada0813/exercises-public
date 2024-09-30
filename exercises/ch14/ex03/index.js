export class IgnoreAccentPattern {
  constructor(pattern) {
    this.pattern = pattern
  }
  // eslint-disable-next-line
  #removeDiacritics(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  [Symbol.search](s) {
    const replaced = this.#removeDiacritics(s)
    let pattern
    if (this.pattern instanceof RegExp) {
      pattern = this.pattern.source
    } else {
      pattern = this.pattern
    }
    let replacedPattern = this.#removeDiacritics(pattern)
    if (this.pattern instanceof RegExp) {
      replacedPattern = RegExp(replacedPattern, this.pattern.flags)
    }
    return replaced.search(replacedPattern)
  }

  [Symbol.match](s) {
    const replaced = this.#removeDiacritics(s)
    let pattern
    if (this.pattern instanceof RegExp) {
      pattern = this.pattern.source
    } else {
      pattern = this.pattern
    }
    let replacedPattern = this.#removeDiacritics(pattern)
    if (this.pattern instanceof RegExp) {
      replacedPattern = RegExp(replacedPattern, this.pattern.flags)
    }
    return replaced.match(replacedPattern)
  }
}