BrowserPolicy.content.allowOriginForAll('www.google.com')
Tinytest.addAsync('HTTP - callPromise', (test, done) => {
  HTTP.callPromise('get', 'http://www.google.com/robots.txt').then(
    (result) => test.equal(result.statusCode, 200))
    .then(done)
});

Tinytest.addAsync('HTTP - getPromise', (test, done) => {
  HTTP.getPromise('http://www.google.com/robots.txt').then(
    (result) => test.equal(result.statusCode, 200))
    .then(done)
});

Tinytest.add('HTTP - postPromise', (test) => {})
Tinytest.add('HTTP - putPromise', (test) => {})
Tinytest.add('HTTP - deletePromise', (test) => {})
