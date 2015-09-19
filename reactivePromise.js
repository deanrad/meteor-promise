var slice = [].slice;

ReactivePromise = function (fn, loadingTextOrObj, errorTextOrFn) {
  var loadingText = (loadingTextOrObj && loadingTextOrObj.pending) || loadingTextOrObj || "",
      displayError = function (e) {
        var errorHandler = loadingTextOrObj.rejected || errorTextOrFn;
        return _.isFunction(errorHandler) ? errorHandler(e) : (errorHandler || "");
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
        returnValues[argHash] = v;
        refire(helperComputation);
        return v;
      }, function (e) {
        returnValues[argHash] = displayError(e);
        refire(helperComputation);
      });
      //suppress display of [object Promise] message
      returnValues[argHash] = loadingText;
    }
    return returnValues[argHash];
  };

};
