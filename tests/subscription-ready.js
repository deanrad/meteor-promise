Tinytest.addAsync('Meteor.subscribe - #readyPromise() - resolves when ready', (test, done) => {
  PromiseTest = new Mongo.Collection("promiseTest");
  test.equal(PromiseTest.find().count(), 0)

  let h = Meteor.subscribe("testPublication")
  test.equal(typeof h.readyPromise, "function")
  let p = h.readyPromise()
  test.equal(typeof p, "object")

  p.then(() => {
    test.equal(PromiseTest.find().count(), 2)
  }).then(done)
});
