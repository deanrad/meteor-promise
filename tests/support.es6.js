identityFn = (x) => x
increment  = (x) => x+1

wrapOnServer =  (f) => {
  var wrapper = Meteor.isServer ? Meteor.bindEnvironment : identityFn;
  return wrapper(f);
}

Meteor.methods({
  identity: identityFn,
  MeteorError() {
    throw new Meteor.Error("forced", "this message will go to the client");
  }
});

Meteor.methods({
  createCustomer: (email, card) => {
    if (!email || !card) throw new Meteor.Error("missing fields");
    return {
      id: 1,
      email: email,
      card: card
    };
  },
  createCustomerSubscription: (custId, plan) => {
    return {
      plan: {
        customerId: custId,
        name: plan
      }
    };
  }
});
