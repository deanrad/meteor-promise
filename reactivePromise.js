import MeteorConstructor from 'deanius-meteor-client'
import _ from 'underscore'
let Meteor = MeteorConstructor(_, _)
let EJSON = Meteor.EJSON
let Tracker = Meteor.Tracker

export default (fn, loadingTextOrObj, errorTextOrFn) => {
  var loadingText = (loadingTextOrObj && loadingTextOrObj.pending) || loadingTextOrObj || "",
      displayError = (e) => {
        var errorHandler = loadingTextOrObj.rejected || errorTextOrFn;
        return _.isFunction(errorHandler) ? errorHandler(e) : (errorHandler || "");
      },
      refire = (computation) => {
        computation.isPromiseResolve = true;
        computation.depsNotDeleted = computation._onInvalidateCallbacks;
        computation._onInvalidateCallbacks = [];
        computation.invalidate();
      },
      cleanup = (computation) => {
        computation._onInvalidateCallbacks = computation.depsNotDeleted;
        delete computation.depsNotDeleted;
        delete computation.isPromiseResolve;
      },
      returnValues = {};
  return ((...args) => {
    let promiseForResult
    let result = null
    args = args.slice(0,-1)  /*remove spacebars, the final arg*/
    let argHash = EJSON.stringify(args, {canonical: true})
    let helperComputation = Tracker.currentComputation
    if (!helperComputation) throw new Error("The function returned from ReactivePromise must be called within a Tracker.autorun")
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
      promiseForResult = result;
      promiseForResult.then(function (v) {
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
  })

};
