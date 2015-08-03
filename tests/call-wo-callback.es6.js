Tinytest.addAsync('Meteor.promise - without callback promise style', (test, done) => {
  var p = Meteor.promise("createCustomer", "a@b.com", "123")
  test.equal(typeof p, "object")
  test.equal(p.constructor, Promise)
  p.then(cust => {
    test.equal(cust.card, "123")
    done()
  })
})
