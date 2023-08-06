function makeClassPropertyIterable(classRef, propertyName) {
  const originalClass = classRef;
  const originalGetter = Object.getOwnPropertyDescriptor(
    classRef.prototype,
    propertyName
  ).get;

  return class extends originalClass {
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
