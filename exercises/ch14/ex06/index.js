export const proxyConstructObject = (object) => {
  const result = [];
  // { time: number, method: string, param: string }

  const handler = {
    get(target, property, receiver) {
      const method = target[property];
      if (typeof method === 'function') {
        return (...args) => {
          const time = new Date().getTime();
          result.push({ time, method: property, param: args });
          return Reflect.apply(method, target, args);
        }
      }
    }
  }
  const p = new Proxy(object, handler);
  return { p, result };
}