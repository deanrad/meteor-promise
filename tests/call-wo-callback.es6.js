Tinytest.addAsync('Method call - with callback', (test, done) => {
  var cb = (err, res) => {
    test.equal(res.card, "123");
    done()
  }
  var p = Meteor.call("createCustomer", "a@b.com", "123", cb)
  test.equal(typeof p, "undefined")
})

Tinytest.addAsync('Method call - without callback promise style', (test, done) => {
  var p = Meteor.call("createCustomer", "a@b.com", "123")
  test.equal(typeof p, "object")
  test.equal(p.constructor, Promise)
  p.then(cust => {
    test.equal(cust.card, "123")
    done()
  })
})
