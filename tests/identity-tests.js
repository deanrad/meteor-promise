var identityArgs = [
  1,
  "one",
  new Date,
  {one: 1}
];

identityArgs.forEach(function(arg){
  var typeofVal = typeof arg,
      type = typeofVal === "object" ? arg.constructor.name : typeofVal;

  Tinytest.addAsync('Method call - identity - ' + type, function (test, done) {
    var p = Meteor.promise("identity", arg);
    p.then(function(val){
      test.equal(arg, val);
      done();
    })
  });
})
