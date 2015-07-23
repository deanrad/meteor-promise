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

  return promise;
};

/**
* @summary Takes a function expecting a final callback, and returns a function
*   that allows for omission of the callback, returning a Promise
* @locus Client
* @param {Function} fn The function to promisify
* @returns {Promise}
*/
Meteor.promisify = function (fn, context) {
    return function (/*arguments, no cb*/) {
      var args = Array.prototype.slice.call(arguments, 0);
      return new Promise(function (resolve, reject) {
        args.push(function (err, result) {
          err ? reject(err) : resolve(result)
        })
        try {
          fn.apply(context, args)
        } catch (err) {
          reject(err)
        }
      })
    }
};

// patches packages/ddp-client/livedata_connection.js
Meteor.call = function (name) {
  var args = Array.prototype.slice.call(arguments, 1);
  var argsWithName = Array.prototype.slice.call(arguments, 0);
  if (args.length && typeof args[args.length - 1] === "function"){
    var callback = args.pop();
    return Meteor.apply(name, args, callback);
  }
  return Meteor.promise.apply(Meteor, argsWithName);
}
