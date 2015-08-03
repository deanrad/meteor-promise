var slice = [].slice;

ReactivePromise = function (fn, loadingText, errorTextOrFn) {
  var loadingText = loadingText || "",
      displayError = function (e) {
        return _.isFunction(errorTextOrFn) ? errorTextOrFn(e) : (errorTextOrFn || "");
      },
      refire = function refire (computation) {
        computation.isPromiseResolve = true;
        computation.depsNotDeleted = computation._onInvalidateCallbacks;
        computation._onInvalidateCallbacks = [];
        computation.invalidate();
      },
      cleanup = function cleanup (computation) {
        computation._onInvalidateCallbacks = computation.depsNotDeleted;
        delete computation.depsNotDeleted;
        delete computation.isPromiseResolve;
      },
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
      cleanup(helperComputation);
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
        refire(helperComputation);
        return v;
      }, function (e) {
        console.log("caught error");
        returnValues[argHash] = displayError(e);
        refire(helperComputation);
      });
      //suppress display of [object Promise] message
      returnValues[argHash] = loadingText;
    }
    return returnValues[argHash];
  };

};
