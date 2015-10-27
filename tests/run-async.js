var nonGenerator = function (){ return 'nope'}
// You may only yield a function, promise, generator, array, or object (no primitive types)
var simpleGenerator = function* (){ yield {} ; yield {}; return 'yep'}

aBitLater = (fn, delay) => new Promise(resolve => {
    setTimeout(()=>resolve(fn.call()), delay)
})

var realGenerator = function* (){
   //console.log('begin coroutine')

   //console.log('beginSync')
   var v1 = yield Promise.resolve(1)
   //console.log('endSync')

   //console.log('callingAsync')
   var v2 = yield aBitLater(()=>(2+30), 500)
   //console.log('endingAsync')

   var msg = `v1 + v2 is: ${v1+v2}`
   //console.log('finished coroutine')
   return msg;
}

Tinytest.addAsync('Meteor.runAsync - returns a promise for the result', (test, done) => {
  Meteor.runAsync(simpleGenerator)
    .then(result => test.equal(result, 'yep'))
    .then(done)
});

Tinytest.addAsync('Meteor.runAsync - combines steps asynchronously', (test, done) => {
  var flag=false;
  Meteor.runAsync(realGenerator)
    .then(result => test.equal(result, 'v1 + v2 is: 33'))
    .then(done)

  // before realGenerator completes, test that other work is done
  setTimeout(()=>(flag= !flag), 100)
  setTimeout(()=>test.equal(flag, true), 101)

});
