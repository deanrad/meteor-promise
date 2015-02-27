/**
   * @memberOf Meteor
   * @summary Gets a Promise (Q, if detected, otherwise jQuery) for the result of a Meteor.call
   * @locus Client
   * @param {String} name Name of method to invoke
   * @param {EJSONable} [arg1,arg2...] Optional method arguments
   * @returns {Promise}
   */
Meteor.promise = function() {
  var d = newDeferred();
  var args = Array.prototype.slice.call(arguments, 0);
  var methodName = args.shift();
  var resolver = function (err, result) {
      if(err){
        d.reject(err);
        return;
      }
      d.resolve(result);
  };

  try {
    Meteor.apply(methodName, args, resolver);
  } catch (err) {
    console.error("Meteor.apply threw exception - this is not normal");
    d.reject(err);
  }

  return promisify(d);
};

function detectedPromiseType () {
  if(typeof Q === "function")
    return "Q";

  return "jQuery";
}

var deferredConstructors = {
  jQuery: function () {
    return $.Deferred();
  },
  Q: function () {
    return Q.defer();
  }
};

var promiseExtractors = {
  jQuery: function (deferred) {
    return deferred.promise();
  },
  Q: function (deferred) {
    return deferred.promise;
  }
};

function newDeferred () {
  return deferredConstructors[detectedPromiseType()]();
}

function promisify (deferred) {
  return promiseExtractors[detectedPromiseType()](deferred);
}
