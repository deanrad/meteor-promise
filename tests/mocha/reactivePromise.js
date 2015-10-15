import assert from 'assert'

// let {describe, it} = require('mocha');

// const loadingMsg = "loading"
// const errMsg = "(error)"
// const errFn = (err) => `Your error: ${err}`
// const defaultReturnVal = "2.71828"
// const defaultErrorVal = new Error("-1")
// const defaultErrorDisplay = "the error is Error: -1"
// const nullFn = () => {}
// const syncFn = () => defaultReturnVal
// const delayedFn = (ms, returnVal=defaultReturnVal) =>
//   () =>
//     new Promise(resolve =>
//       setTimeout(() => resolve(returnVal), ms))
// const rejectingFn = () => Promise.reject(defaultErrorVal)
// const equalEJSON = function equalEJSON (a, b) {
//   return this.equal(EJSON.stringify(a, {canonical:true}), EJSON.stringify(b, {canonical:true}))
// }
//
//
// describe('ReactivePromise - Basics', () => {
//   let wrappedFn = ReactivePromise(nullFn)
//
//   it('returns a wrapped function', (done) =>{
//     test.equal(typeof wrappedFn, "function")
//     done()
//   })
// })
