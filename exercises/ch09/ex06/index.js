export class TypedMap {
  constructor(keyType, valueType, entries) {
    if (entries) {
      for (const [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError("Wrong type for entry [${k},${v}]");
        }
      }
    }
    this.map = new Map(entries);
    this.keyType = keyType;
    this.valueType = valueType;
  }

  set(key, value) {
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError("${key} is not of type ${this.keyType}");
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError("${value} is not of type ${this.valueType}");
    }

    return this.map.set(key, value);
  }
  get(key) {
    return this.map.get(key);
  }
}
