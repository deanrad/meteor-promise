var co = require('co')

Meteor.runAsync = function (fn) {
  if (fn.constructor.name !== "GeneratorFunction")
    console.info("Meteor.runAsync can not tell if this is a generator function.")

  return co(fn)
}
