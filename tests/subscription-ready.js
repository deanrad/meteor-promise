Tinytest.addAsync('Meteor.subscribe - #readyPromise - resolves when ready', (test, done) => {
  PromiseTest = new Mongo.Collection("promiseTest");
  test.equal(PromiseTest.find().count(), 0)

  let h = Meteor.subscribe("testPublication")
  test.equal(typeof h.readyPromise, "object")

  h.readyPromise.then(() => {
    test.equal(PromiseTest.find().count(), 2)
  }).then(done)
});
