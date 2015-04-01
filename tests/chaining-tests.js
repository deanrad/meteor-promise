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
}
