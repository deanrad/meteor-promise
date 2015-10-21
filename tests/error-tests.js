Tinytest.addAsync('Meteor.callPromise - MeteorError - then', (test, done) => {
  var p = Meteor.callPromise("MeteorError");
  p.then((val) => {
    //this branch wont be run
    test.equal(1,2);
    done();
  }, wrapOnServer((e) => {
    test.equal(e.error, "forced");
    test.equal(e.reason, "this message will go to the client");
    done();
  }));
});

Tinytest.addAsync('Meteor.callPromise - MeteorError - catch', (test, done) => {
  var p = Meteor.callPromise("MeteorError");
  p.then(() => {
    //this branch wont be run
    test.equal(1,2);
    done();
  }).catch(wrapOnServer((e) => {
    test.equal(e.error, "forced");
    test.equal(e.reason, "this message will go to the client");
    done();
  }));
});
