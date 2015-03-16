Tinytest.addAsync('Method call - MeteorError', function (test, done) {
  var p = Meteor.promise("MeteorError");
  p.then(function(val){
    //this branch wont be run
    test.equal(1,2);
    done();
  }).catch(function(e){
    test.equal(e.error, "forced");
    test.equal(e.reason, "this message will go to the client");
    done();
  })
});
