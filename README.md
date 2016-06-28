# deanius:promise
[![Build Status](https://img.shields.io/travis/deanius/meteor-promise.svg)](https://travis-ci.org/deanius/meteor-promise) ![ES 2015](https://img.shields.io/badge/ES-2015-brightgreen.svg) [![Version Info](https://img.shields.io/badge/meteor-v3.1.2-green.svg)](https://atmospherejs.com/deanius/promise) [![Codacy Badge](https://api.codacy.com/project/badge/d432270b7b0b4be5b818aae1be5101d7)](https://www.codacy.com/app/deanmisc/meteor-promise) [![twitter link](https://img.shields.io/badge/twitter-@deaniusdev-55acee.svg)](https://twitter.com/@deaniusdev)

# Install
```
meteor add deanius:promise
```

# API

The *deanius:promise* package gives you the following functionality:

  - [`Meteor.callPromise`](#call-promise) - The same as Meteor.call, but you omit the callback parameter, and it returns a `Promise` for the result
  - [`Meteor.runAsync`](#run-async) - Uses the [co NPM Library](https://www.npmjs.com/package/co) to run a JavaScript generator function yielding promises, as though it were synchronous
  - [`HTTP.getPromise`](#http) - All methods on the HTTP object will have Promise-returning versions, just append `Promise` onto the method name.
  - `Meteor.subscribe` - The object returned by `Meteor.subscribe` will have a `readyPromise()` function which, when called, returns a Promise that resolves when `ready()` returns `true`.
  - `Meteor.wrapPromise` - Takes *any* callback-style function, and returns a Promise-returning function. This is like Meteor.wrapAsync, but useful on the client.
  - `ReactivePromise` - A function to wrap Promise-returning functions with, to create reactive functions - such as helpers - which update when their promised value becomes available.


Thoughts? Questions? Open an issue in [`deanius:promise`](https://github.com/deanius/meteor-promise), and let's discuss. Or find me on social media. Thanks for your interest!
