Meteor.methods({
  identity: function(val){
    return val;
  },
  MeteorError: function(){
    throw new Meteor.Error("forced", "this message will go to the client");
  }
});
