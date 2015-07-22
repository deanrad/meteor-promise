var identityArgs = [
  1,
  "one",
  new Date,
  {one: 1}
];

identityArgs.forEach((arg) => {
  var typeofVal = typeof arg,
      type = typeofVal === "object" ? arg.constructor.name : typeofVal;

  Tinytest.addAsync('Method call - identity - ' + type, (test, done) => {
    var p = Meteor.call("identity", arg);
    p.then(wrapOnServer((val) => {
      test.equal(arg, val);
      done();
    }));
  });
})

Tinytest.addAsync('Method call - identity - named function', (test, done) =>{
  var arg = {some: 'thing'};
  var p = Meteor.call("identity", arg);

  var testFunc = wrapOnServer((val) => {
    test.equal(arg, val);
    done();
  });

  p.then(testFunc);
});
