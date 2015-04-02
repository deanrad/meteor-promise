// This test not reliably passing on the server

if (Meteor.isClient) {
  Tinytest.addAsync('Method call - chaining - 3', function (test, done) {
    var p = Meteor.promise("identity", 1);

    var testFunc = wrapOnServer(function (actual) {
      test.equal(actual, 1+1+1);
      done();
    });

    p.then(increment)
     .then(increment)
     .then(testFunc);
  });

  Tinytest.addAsync('Method call - chaining - README Examples - success', function (test, done) {
    Meteor.promise("createCustomer", "foo@bar.com", "VISA")
      .then(function(customer) {
        return Meteor.promise("createCustomerSubscription", customer.id, "foo");
      })
      .then(function(plan) {
        console.log("Plan", plan);
      })
      .then(function () {
        test.equal(true, true);
        done();
      })
      .catch(function (err) {
        test.equal(true, false);
        console.error(err);
        done();
      });
  });
  Tinytest.addAsync('Method call - chaining - README Examples - fail', function (test, done) {
    Meteor.promise("createCustomer") // will throw due to no args
      .then(function(customer) {
        return Meteor.promise("createCustomerSubscription", customer.id, "foo");
      })
      .then(function(plan) {
        console.log("Plan", plan);
      })
      .then(function () {
        test.equal(true, false);
        done();
      })
      .catch(function (err) {
        test.equal(true, true);
        console.error(err);
        done();
      })

  });
}
