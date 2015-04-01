identityFn = function (x) { return x };
increment  = function (x) { return x+1 };

wrapOnServer = function (f) {
  var wrapper = Meteor.isServer ? Meteor.bindEnvironment : identityFn;
  return wrapper(f);
}
