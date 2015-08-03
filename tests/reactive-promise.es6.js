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
      setTimeout(resolve.bind(_, returnVal), ms))
const rejectingFn = () => Promise.reject(defaultErrorVal)

Tinytest.addAsync('ReactivePromise - Basics - returns a wrapped function', (test, done) => {
  let wrappedFn = ReactivePromise(nullFn)
  test.equal(typeof wrappedFn, "function")
  done()
})

Tinytest.addAsync('ReactivePromise - Basics - wrapped function must be run in an autorun', (test, done) => {
  let caught = 0, err = null
      wrappedFn = ReactivePromise(syncFn, loadingMsg)
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
      wrappedFn = ReactivePromise(delayedFn(100), loadingMsg)

  Tracker.autorun(() => {
    returnVal = wrappedFn()
  })
  test.equal(returnVal, loadingMsg)
  done()
})

Tinytest.addAsync('ReactivePromise - Basics - returns value once resolved', (test, done) => {
  let returnVal = null,
      wrappedFn = ReactivePromise(delayedFn(100), loadingMsg, errMsg)

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
      wrappedFn = ReactivePromise(rejectingFn, loadingMsg, errMsg)
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
      wrappedFn = ReactivePromise(rejectingFn, loadingMsg, (e)=>`the error is ${e}`)
  Tracker.autorun(() => {
    returnVal = wrappedFn()
  })
  test.equal(returnVal, loadingMsg)
  setTimeout(()=>{
    test.equal(returnVal, defaultErrorDisplay)
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
  //TODO finish these
})
