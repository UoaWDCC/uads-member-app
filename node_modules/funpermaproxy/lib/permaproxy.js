/***
 * Rewritten version of {@link https://github.com/MatrixAI/js-permaproxy}
 * The original code was under Apache-2.0 license, as of 11.05.2019.
 * Differences from the original:
 *
 * 1. No construct and apply proxy traps.
 * 2. Instead of an object reference and property name, uses getter function.
 * 3. Rewritten in arrow functions
 */
function permaproxy(directGetter) {
  const target = {};
  const getter = () => directGetter() || target;
  const bound = new WeakMap();

  return new Proxy(target, {
    getPrototypeOf: (_) => Reflect.getPrototypeOf(getter()),
    setPrototypeOf: (_, prototype) => Reflect.setPrototypeOf(getter(), prototype),
    isExtensible: (_) => Reflect.isExtensible(getter()),
    preventExtensions: (_) => Reflect.preventExtensions(getter()),
    getOwnPropertyDescriptor: (_, property) => Reflect.getOwnPropertyDescriptor(getter(), property),
    defineProperty: (_, property, descriptor) => Reflect.defineProperty(getter(), property, descriptor),
    has: (_, property) => Reflect.has(getter(), property),
    get: (_, property) => {
      const target = getter();
      const value = Reflect.get(target, property);

      return (typeof value === 'function') ? value.bind(target) : value;
    },
    set: (_, property, value) => Reflect.set(getter(), property, value),
    deleteProperty: (_, property) => Reflect.deleteProperty(getter(), property),
    ownKeys: (_) => Reflect.ownKeys(getter()),
  });
}

module.exports = permaproxy;
