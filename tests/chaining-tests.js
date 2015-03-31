Tinytest.addAsync('Method call - chain of 3', function (test, done) {
  var p = Meteor.promise("identity", 1);

  function increment (arg) { return arg + 1 };

  function testFunc (actual) {
    test.equal(actual, 1+1+1);
    done();
  }

  p.then(increment)
   .then(increment)
   .then(Meteor.bindEnvironment(testFunc));
});
