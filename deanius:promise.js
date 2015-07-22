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
