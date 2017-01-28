if (!Array.prototype.aggregate) {
  Object.defineProperty(Array.prototype, 'aggregate', {
    value: function(callback) {
      if (this === null) {
        throw new TypeError('Array.prototype.reduce called on null or undefined');
      }
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      return this
        .filter( obj => obj != undefined )
        .reduce((merged, next) => {

          return Object
            .keys(next)
            .reduce((target, nextKey) => {

              let valueToAdd = next[ nextKey ];
              let existingValue = target[ nextKey ];

              if (!existingValue) {
                target[ nextKey ] = valueToAdd;
              }

              target[ nextKey ] = callback(existingValue, valueToAdd);

              return target;

            }, merged);

        }, {});
    }
  });
}
