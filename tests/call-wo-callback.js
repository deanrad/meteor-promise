Tinytest.addAsync('Meteor.callPromise - without callback promise style', (test, done) => {
  var p = Meteor.callPromise("createCustomer", "a@b.com", "123")
  test.equal(typeof p, "object")
  test.equal(typeof p.then, "function")
  p.then(cust => {
    test.equal(cust.card, "123")
    done()
  })
})
