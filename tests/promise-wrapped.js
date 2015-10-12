Tinytest.addAsync('HTTP - callPromise', (test, done) => {
  HTTP.callPromise('get', 'http://www.deanius.com/robots.txt').then(
    (result) => test.equal(result.statusCode, 200))
    .then(done)
});

Tinytest.addAsync('HTTP - getPromise', (test, done) => {
  HTTP.getPromise('http://www.deanius.com/robots.txt').then(
    (result) => test.equal(result.statusCode, 200))
    .then(done)
});

Tinytest.add('HTTP - postPromise', (test) => {})
Tinytest.add('HTTP - putPromise', (test) => {})
Tinytest.add('HTTP - deletePromise', (test) => {})

Tinytest.add('Promise - denodeify', (test) => {
  test.equal(typeof Promise.denodeify, "function")
});
