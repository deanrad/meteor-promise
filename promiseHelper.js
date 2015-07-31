var slice = [].slice;

PromiseHelper = function (fn, loadingText) {
  var loadingText = loadingText || "",
      returnValues = {};
  return function(/* ...args, spacebars */) {
    var args, argHash, helperComputation, promise, reactiveValue, result;
    var i;
    args = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []);
    console.log("helper run for ", args);
    result = null;
    argHash = EJSON.stringify(args, {
      canonical: true
    });

    helperComputation = Tracker.currentComputation;
    if (helperComputation.isPromiseResolve) {
      helperComputation._onInvalidateCallbacks = helperComputation.depsNotDeleted;
      delete helperComputation.depsNotDeleted;
      delete helperComputation.isPromiseResolve;
      return returnValues[argHash];
    }

    reactiveValue = Tracker.autorun(function () {
      console.log("evaluating helper " + argHash);
      delete returnValues[argHash];
      result = fn.apply({}, args);
      returnValues[argHash] = result;
    });
    reactiveValue.onInvalidate(function () {
      if (!helperComputation.isPromiseResolve) {
        delete returnValues[argHash];
        helperComputation.invalidate();
      }
    });

    if (returnValues[argHash] instanceof Promise) {
      promise = result;
      promise.then(function (v) {
        console.log("Promise resolved", argHash, v);
        returnValues[argHash] = v;
        helperComputation.isPromiseResolve = true;
        helperComputation.depsNotDeleted = helperComputation._onInvalidateCallbacks;
        helperComputation._onInvalidateCallbacks = [];
        helperComputation.invalidate();
        return v;
      });
      //suppress display of [object Promise] message
      returnValues[argHash] = loadingText;
    }
    return returnValues[argHash];
  };

};
