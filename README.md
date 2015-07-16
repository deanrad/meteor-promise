# deanius:promise [![Build Status](https://secure.travis-ci.org/deanius/deanius-meteor-promise.png?branch=master)](https://travis-ci.org/deanius/deanius-meteor-promise)

## Overview
Nesting callbacks stinks, so calling `Meteor.call` in succession is more painful than it needs to be. If only there were `Meteor.promise`, which returns a chainable object. This package does just that.

An ES6 compatible promise, as provided by [es6-promise](https://github.com/jakearchibald/es6-promise) is returned.

For background on why to use promises, [Promises/A+](https://promisesaplus.com/)
is a good place to learn how nice it is to be callback-free.

## How to use

    meteor add deanius:promise

On the server, you may want to wrap callbacks in `Meteor.bindEnvironment`.
The Meteor Docs, and Chris Mather's Evented Mind videos explain more about that.

## Detailed Example

Let's say you have two server-side methods, the first of which is made to create a customer (or throw an error),
the second of which is made to associate a thing with the customer, and which requires the customer id created in the first method.

```
// On the server
Meteor.methods({
  createCustomer: function(email, card) {
    if (!email || !card) throw new Meteor.Error("missing fields");
    return {
      id: 1,
      email: email,
      card: card
    };
  },
  createCustomerSubscription: function(custId, plan) {
    return {
      plan: {
        customerId: custId,
        name: plan
      }
    };
  }
});

```

You want to chain the two calls, but you'd like to avoid nesting callbacks, because [Promises](http://api.jquery.com/deferred.then/) are great tools, not used frequently enough.

Instead of inflicting pyramids-of-doom upon yourself and others, create a promise for the result, using `Meteor.promise`, then chain them together using `then`. You need only a single `catch` error handler tacked on at the end, and the code of each step can be cleaner, safely omitting the obligtory check for the `err` argument to a callback.


```
var plan = "Plan9"; //first obtain this so later steps can use it
Meteor.promise("createCustomer", "foo@bar.com", "VISA")
  .then(function(customer) {
    return Meteor.promise("createCustomerSubscription", customer.id, plan);
  })
  .then(function(plan) {
    console.log("Plan", plan);
  })
  .catch(function (err) {
    console.error(err);
  })

```

Note that each step in the promise chain must take a single argument, which will
be the return value from the previous call.

# Inspiration
**The Meteor Chef**: http://themeteorchef.com/recipes/building-a-saas-with-meteor-stripe-part-1/
