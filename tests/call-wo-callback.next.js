Tinytest.addAsync('Method call - no callback - 1', (test, done) => {
  var p = Meteor.call("createCustomer", "a@b.com", "123")
  test.equal(typeof p, "object")
  test.equal(p.constructor, Promise)
  done()
})

Tinytest.addAsync('Method call - with callback - 1', (test, done) => {
  var cb = (err, res) => {}
  var p = Meteor.call("createCustomer", "a@b.com", "123", cb)
  test.equal(typeof p, "undefined")
  done()
})
