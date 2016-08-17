const loadingMsg = "loading"
const errMsg = "(error)"
const errFn = (err) => `Your error: ${err}`
const defaultReturnVal = "2.71828"
const defaultErrorVal = new Error("-1")
const defaultErrorDisplay = "the error is Error: -1"
const nullFn = () => {}
const syncFn = () => defaultReturnVal
const delayedFn = (ms, returnVal=defaultReturnVal) =>
  () =>
    new Promise(resolve =>
      setTimeout(() => resolve(returnVal), ms))
const rejectingFn = () => Promise.reject(defaultErrorVal)
const equalEJSON = function equalEJSON (a, b) {
  return this.equal(EJSON.stringify(a, {canonical:true}), EJSON.stringify(b, {canonical:true}))
}

Tinytest.addAsync('ReactivePromise - Basics - returns a wrapped function', (test, done) => {
  let wrappedFn = ReactivePromise(nullFn)
  test.equal(typeof wrappedFn, "function")
  done()
})

Tinytest.addAsync('ReactivePromise - Basics - wrapped function must be invoked in an autorun', (test, done) => {
  let caught = 0, err = null
      wrappedFn = ReactivePromise(syncFn, {pending: loadingMsg})
  try {
    let retVal = wrappedFn();
  } catch (ex) {
    err = ex
    caught = 1
  }
  test.equal(caught, 1)
  done()
})

Tinytest.addAsync('ReactivePromise - Basics - returns loading text when promise is not resolved', (test, done) => {
  let returnVal = null,
      wrappedFn = ReactivePromise(delayedFn(100), {pending: loadingMsg})

  Tracker.autorun(() => {
    returnVal = wrappedFn() // <-- I'm happy now, autoruns are where you call me
  })
  test.equal(returnVal, loadingMsg)
  done()
})

Tinytest.addAsync('ReactivePromise - Basics - returns value once resolved', (test, done) => {
  let returnVal = null,
      wrappedFn = ReactivePromise(delayedFn(100), {pending: loadingMsg, rejected: errMsg})

  Tracker.autorun(() => {
    returnVal = wrappedFn()
  })
  test.equal(returnVal, loadingMsg)

  setTimeout(()=>{
    test.equal(returnVal, defaultReturnVal)
    done()
  }, 150)

})

Tinytest.addAsync('ReactivePromise - Basics - returns errMsg if rejected', (test, done) => {
  let returnVal = null,
      wrappedFn = ReactivePromise(rejectingFn, {pending: loadingMsg, rejected: errMsg})
  Tracker.autorun(() => {
    returnVal = wrappedFn()
  })
  test.equal(returnVal, loadingMsg)
  setTimeout(()=>{
    test.equal(returnVal, errMsg)
    done()
  }, 100)
})

Tinytest.addAsync('ReactivePromise - Basics - invokes errFn upon rejection', (test, done) => {
  let returnVal = null,
      wrappedFn = ReactivePromise(rejectingFn, {pending: loadingMsg, rejected: errFn})
  Tracker.autorun(() => {
    returnVal = wrappedFn()
  })
  test.equal(returnVal, loadingMsg)
  setTimeout(()=>{
    test.equal(returnVal, errFn('Error: -1'))
    done()
  }, 100)
})

Tinytest.addAsync('ReactivePromise - Basics - can wrap a synchronous function without reinvoking', (test, done) => {
  let returnVal = null,
      wrappedFn = ReactivePromise(syncFn),
      timesRun = 0;

  Tracker.autorun(() => {
    timesRun += 1
    returnVal = wrappedFn()
  })
  test.equal(timesRun, 1) // normal for Tracker.autorun
  setTimeout(()=>{
    test.equal(timesRun, 1) // no additional runs
    done()
  }, 50)
})

Tinytest.addAsync('ReactivePromise - Reactivity - responds to dep changes', (test, done) => {
  test.equalEJSON = equalEJSON
  let returnVal = null
  let timesRun = 0
  let previousValues = []
  let rvar = new ReactiveVar("a")
  // a function with 50ms delay, since 40ms is minimum reliable setTimeout time
  let delayedWrappedFn = ReactivePromise(() => {
    let curVal = rvar.get()
    return new Promise(resolve =>
      setTimeout(() => resolve(curVal.toUpperCase()), 50))}, loadingMsg)

  Tracker.autorun(() => {
    returnVal = delayedWrappedFn()
    previousValues.push(returnVal)
  })

  let timeline = {
    0: ["loading"],
    //XXX FTLOG - this is flaky that i have to do this, for case of spacejam/travis tests!!
    //50: ["loading", "A"],
    100: () => rvar.set("b"),
    185: ["loading", "A", "loading", "B"],
    200: () => {rvar.set("c"); rvar.set("d")},
    285: ["loading", "A", "loading", "B", "loading", "D"],
    385: ["loading", "A", "loading", "B", "loading", "D"],
    420: () => rvar.set("e"),
    440: () => rvar.set("f"),
    525: ["loading", "A", "loading", "B", "loading", "D", "loading", "loading", "E", "F"],
    570: done
  }

  _.each(timeline, function(stateOrChange, time) {
    if(_.isFunction(stateOrChange))
      setTimeout(stateOrChange, time)
    else
      setTimeout(() => {
        Tracker.afterFlush(() => {
          test.equalEJSON(previousValues, stateOrChange)
        })
      }, time)
  })

})

Tinytest.addAsync('ReactifyPromise - resolve - returns a ReactiveVar from a promise', (test, done) => {
  let p = Promise.resolve(2.1)
  let rp = ReactifyPromise(p, 0)
  test.equal(rp.get(), 0)
  setTimeout(() => {
    test.equal(rp.get(), 2.1)
    done()
  })
})

Tinytest.addAsync('ReactifyPromise - reject - returns a ReactiveVar populated with the error', (test, done) => {
  let p = Promise.reject(2.1)
  let rp = ReactifyPromise(p, 0)
  test.equal(rp.get(), 0)
  setTimeout(() => {
    test.equal(rp.get(), 2.1)
    done()
  })
})

Tinytest.addAsync('PromisifyReactiveVar - returns a promise which resolves with the next value of this ReactiveVar', (test, done) => {
  let rvar = new ReactiveVar(-1)
  let p = PromisifyReactiveVar(rvar)

  // If you set twice before a Tracker.flush, only the last value will be the resolved value
  rvar.set(-2.1)
  rvar.set(-2.2) 
  test.equal(rvar.get(), -2.2)

  // After the flush, setting should be a noop - our promise resolves only once
  Tracker.afterFlush(() => {
    rvar.set(-2.3) 
  })

  // We have the value present
  p.then(nextVal => {
    test.equal(nextVal, -2.2)
  }).then(done, done)

})
