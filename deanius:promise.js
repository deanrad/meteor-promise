/**
   * @memberOf Meteor
   * @summary Gets a JQuery Promise for the result of a Meteor.call
   * @locus Client
   * @param {String} name Name of method to invoke
   * @param {EJSONable} [arg1,arg2...] Optional method arguments
   * @returns {Promise} 
   */
Meteor.promise = function() {
  var d = $.Deferred();
  var args = Array.prototype.slice.call(arguments, 0);
  var methodName = args.shift();
  var resolver = function (err, result) {
      if(err){
        d.reject(err);
        return;
      }
      d.resolve(result);
  };

  try{
    Meteor.apply(methodName, args, resolver)
  }catch(err){
    console.error("Meteor.apply threw exception - this is not normal")
    d.reject(err);
  }

  return d.promise();
};
