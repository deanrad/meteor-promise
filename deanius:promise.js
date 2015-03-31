// Provide a polyfill
if (typeof Promise !== "function") {
  Npm.require("es6-promise").polyfill();
}

/**
   * @memberOf Meteor
   * @summary Gets a ES6-compatible Promise for the result of a Meteor.call
   * @locus Client
   * @param {String} name Name of method to invoke
   * @param {EJSONable} [arg1,arg2...] Optional method arguments
   * @returns {Promise}
   */
Meteor.promise = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  var methodName = args.shift();
  var promise = new Promise(function(resolve, reject){
    var resolver = function (err, result) {
      if(err)
        reject(err);
      else
        resolve(result);
    };

    try {
      Meteor.apply(methodName, args, resolver);
    } catch (err) {
      console.error("Meteor.apply threw exception - this is not normal");
      reject(err);
    }
  });

  bindMethod(promise, "then");
  bindMethod(promise, "catch");
  return promise;
};

/* Allow callbacks passed .then(onFulfilled, onRejected), or .catch(onRejected),
   to be sure to be called in the Meteor environment.
 */
function bindMethod (promise, methodName) {
  var originalFunc = promise[methodName];

  var reraise = function (err) { throw err; };

  promise[methodName] = function(callback1, callback2) {
    var bound1 = (callback1) ? Meteor.bindEnvironment(callback1, reraise) : null;
    var bound2 = (callback2) ? Meteor.bindEnvironment(callback2, reraise) : null;

    if (!bound2) {
      return originalFunc.call(promise, bound1);
    } else {
      return originalFunc.call(promise, bound1, bound2);
    }
  };
}
