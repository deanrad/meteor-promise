Tinytest.addAsync('HTTP - callPromise', (test, done) => {
  HTTP.callPromise('get', 'https://httpbin.org/get').then(
    (result) => test.equal(result.statusCode, 200))
    .then(done)
});

Tinytest.addAsync('HTTP - getPromise', (test, done) => {
  HTTP.getPromise('https://httpbin.org/get').then(
    (result) => test.equal(result.statusCode, 200))
    .then(done)
});

Tinytest.add('HTTP - postPromise', (test) => {})
Tinytest.add('HTTP - putPromise', (test) => {})
Tinytest.add('HTTP - deletePromise', (test) => {})
