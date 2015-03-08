# deanius:promise [![Build Status](https://secure.travis-ci.org/chicagogrooves/deanius-meteor-promise.png?branch=master)](https://travis-ci.org/chicagogrooves/deanius-meteor-promise)

## Overview
Nesting callbacks stinks, so calling `Meteor.call` in succession is more painful than it needs to be. If only there were `Meteor.promise`, which returns a chainable object. This package does just that.

The first promise implementation found on this list will be used:
  * [Q](https://github.com/kriskowal/q)
  * [Jquery Deferred] (http://api.jquery.com/deferred.then/)

For background on why to use promises, [Promises/A+](https://promisesaplus.com/))
is a good place to learn how nice it is to be callback-free.

## How to use

    meteor install deanius:promise

## Detailed Example

Let's say you have two server-side methods, the first of which is made to create a customer (or throw an error),
the second of which is made to associate a thing with the customer, and which requires the customer id created in the first method.

```
Meteor.methods({
  createCustomer: function(input) {
    if (input === -1) {
      throw new Meteor.Error("Uh uh");
    } else {
      return {customer: {id: 1}};
    }
  },
  createCustomerThing: function(custId, thing) {
    return {
      customer: {
        id: custId,
        thing: obj
      }
    };
  }
});

```

You want to chain the two calls, but you'd like to avoid nesting callbacks, because [Promises](http://api.jquery.com/deferred.then/) are great tools, not used frequently enough.

Instead of inflicting pyramids-of-doom upon yourself and others, create a promise for the result, using `Meteor.promise`, then chain them together using `then`. You need only a single `fail` error handler tacked on at the end, and the code of each step can be cleaner, safely omitting the obligtory check for the `err` argument to a callback.


```
function createCustomer(){
  return Meteor.promise("createCustomer");
}

function createCustomerThing(customer){
  var thing = {some: 'stuff'};
  return Meteor.promise("createCustomerThing", customer.id, thing);
}

// without an error
Meteor.promise("createCustomer")
   .then(createCustomerThing)
   .done(function(customer){ console.log("Good", customer); })
   .fail(function(err){ console.error("Bad", err); })

// with an error, handled in one place
Meteor.promise("createCustomer", -1)
   .then(createCustomerThing)
   .done(function(customer){ console.log("Good", customer); })
   .fail(function(err){ console.error("Bad", err); })

```
