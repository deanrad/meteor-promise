# deanius:promise [![Build Status](https://secure.travis-ci.org/deanius/deanius-meteor-promise.png?branch=master)](https://travis-ci.org/deanius/deanius-meteor-promise)

# Demo
The demo-enabled README is at http://deanius-promise.meteor.com/

# What is a Promise ?

> A Promise is an object type which serves as a placeholder for a future result, such as the body of an HTTP request, or the return value of a Meteor method call. Basically any function that forces you to pass a callback to receive its return value (instead of just returning it) is said to be an async function, and the value it gives back can be represented by a Promise.

# How can using them enhance my Meteor development ?

Well, not only can they enhance your Meteor development, they are now
forever a part of JavaScript - in the standard called ES6 or ES 2015.

Basically they allow you to pass around placholders for values
which you may have to wait for due to:

  * waiting on the network, like for a `Meteor.promise`
  * waiting on a user interaction
  * waiting on a page load event

If Meteor callback-accepting code were converted to Promises, you
could use helpers and Reactivity to work with values that will be
*eventually* available, in addition to values that are immediately available.

## Show me the code!

It's easy as 1, 2, 3.

1) We declare the method, and the UI for the fields.

```js
Meteor.methods({
  add: function (x, y) {
    return x + ", " + y;
  }
})
```
```html
<template name="ui">
  <input id="arg1" class="dynamic" value="foo"/>
  <input id="arg2" class="dynamic" value="foo"/>
</template>
```

2) Next we ensure that two reactive variables,
`arg1` and `arg2` get updated whenever a `keyup` event is detected in
either input field. One way to do this is:

```js
Template.ui.onCreated(function (){
  this.arg1 = new ReactiveVar("foo");
  this.arg2 = new ReactiveVar("bar");
});
Template.ui.events({
  "keyup .dynamic": function (event, template) {
    var whichVar = event.target.id;
    var inputValue = template.$("#"+whichVar).val();
    template[whichVar].set(inputValue);
  }
});
```

3) Now, we define the helper to populate the `<textarea>`. It's as simple
as this, and our field will keep up to date with the server's response!

```js
Template.ui.helpers({
  "concatenatedArgs": ReactivePromise(function () {
    var template = Template.instance();
    var promise =  Meteor.promise("add", template.arg1.get(), template.arg2.get());
    return promise;
  })
});
```

# How In The???
So let me explain some of the *magic* going on here.

First, the version of `Meteor.promise` being used is an enhanced one provided by `deanius:promise`. It allows you to omit the final callback parameter you'd have passed to `Meteor.call`, and instead provides a Promise for the result. Promises are effectively the same as callbacks, but instead of handling the response in one method like this:

```js
function (err, result){
  if (err) { console.error(err); return; }
  console.log(result);
}
```

Promises return an object onto which you can attach `then` and `catch` handlers.
```js
Meteor.promise('someMethod')
   .then(function(result){ console.log(result)})
   .catch(function(err){ console.error(err))}))
```

Promises are better than callbacks for many reasons, not the least of
which is that you can separate error-handling code from happy-path code.
A full explanation of Promises is out of scope here, but since they are
part of the new ES6 JavaScript standard, it would be great if you learn
how to use them.

Now, the secret sauce. By wrapping our helper function in `ReactivePromise`, it allows us to return a Promise. When that Promise is *resolved*-in other words, when its result has come in- the helper will update.

```js
Template.ui.helpers({
  "concatenatedArgs": ReactivePromise(function(){ /* something */})
});
```

*And that's all there is to it!*

In order for you to see that there is some delay between creating the Promise, and its resolution, the Meteor.method includes a call to `Meteor.sleep`, from the `froatsnook:sleep` package. This is a good idea to have in place during development so you can see something of what your users will experience when they use your app.

# Going farther

Promises are chainable, so if we need to do some post-processing on the server result, no problem! Each time we tack a `then` onto an existing Promise, a new Promise is created for the combined result of all previous promises, much like chaining with JQuery. So we can do this:

```js
concatenatedArgs: ReactivePromise(function () {
  var template = Template.instance();
  var promise = Meteor.promise("add", template.arg1.get(), template.arg2.get());
  return promise.then(function(result){
    return "Server says: " + result;
  }).then(function(result){
    return result + " :)"
  })
})
```

# A New Hope ?
ReactivePromise is completely safe to wrap regular (synchronous, non-promise returning) helpers with. So if every method passed to `Template.name.helpers` were automatically wrapped in it, you'd find that you could return Promises at will from a function. This would raise the level of abstraction to say that helpers can be sync, or async - either type of code would work.

Promises can be used anywhere callback-accepting code is, so `HTTP.call` and friends could all be modified to return a Promise if the final callback parameter is omitted. This would increase the ease with which we could combine Reactive functionality across different types of use cases.

Thoughts? Questions? Open an issue in [`deanius:promise`](https://github.com/deanius/meteor-promise), and let's discuss. Or find me on social media. Thanks for your interest!
