export function instanceOf(object, constructor) {
  return Object.prototype.isPrototypeOf.call(constructor.prototype, object);
}
