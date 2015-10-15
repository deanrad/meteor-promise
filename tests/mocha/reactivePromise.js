import assert from 'assert'
import MeteorConstructor from 'deanius-meteor-client'
import _ from 'underscore'
let Meteor = MeteorConstructor(_, _)
let EJSON = Meteor.EJSON
import ReactivePromise from '../../reactivePromise'

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


describe('ReactivePromise - Basics', () => {
  let wrappedFn = ReactivePromise(nullFn)

  it('returns a wrapped function', () => {
    assert.equal(typeof wrappedFn, "function")
  })

  it('wrapped function must be invoked in an autorun', () => {
    let caught = 0, err = null, msg = null
    let wrappedFn = ReactivePromise(syncFn, {pending: loadingMsg})

    try {
      let retVal = wrappedFn();
    } catch (ex) {
      err = ex
      msg = ex.message
    }
    assert.equal(msg, "The function returned from ReactivePromise must be called within a Tracker.autorun")
  })

})
