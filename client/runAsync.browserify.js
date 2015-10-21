var co = require('co')
var exampleGen = function*(){ }
Meteor.runAsync = function (fn) {
  if (typeof fn === "undefined" || fn.constructor.name !== exampleGen.constructor.name)
    throw new Meteor.Error("Must use a generator function (function*) with Meteor.runAsync");

  return co(fn)
}
