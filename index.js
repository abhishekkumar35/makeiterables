function makeClassPropertyIterable(classRef, propertyName) {
  const customClass = classRef;
  const originalGetter = Object.getOwnPropertyDescriptor(
    classRef.prototype,
    propertyName
  ).get;

  return class extends customClass {
    constructor(...args) {
      super(...args);
    }

    *[Symbol.iterator]() {
      const iterable = originalGetter.call(this);
      for (const item of iterable) {
        yield item;
      }
    }
  };
}

module.exports = { makeClassPropertyIterable };
