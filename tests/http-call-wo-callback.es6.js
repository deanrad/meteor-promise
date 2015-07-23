const httpOptions = {}

Tinytest.addAsync('HTTP.call - with callback', (test, done) => {
  let cb = (err, res) => {
    test.equal(res.statusCode, 200)
    done()
  }
  let p = HTTP.get("http://localhost:3000", httpOptions, cb)
  test.equal(typeof p, "undefined")
})

Tinytest.addAsync('HTTP.call - without callback promise style', (test, done) => {
  let p = HTTP.call("GET", "http://localhost:3000")
  test.equal(typeof p, "object")
  test.equal(p.constructor, Promise)
  p.then(response => {
    test.equal(response.statusCode, 201)
    done()
  })
})
