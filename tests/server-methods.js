Meteor.methods({
  identity: function (val) {
    return val;
  },
  MeteorError: function () {
    throw new Meteor.Error("forced", "this message will go to the client");
  }
});

Meteor.methods({
  createCustomer: function (email, card) {
    if (!email || !card) throw new Meteor.Error("missing fields");
    return {
      id: 1,
      email: email,
      card: card
    };
  },
  createCustomerSubscription: function (custId, plan) {
    return {
      plan: {
        customerId: custId,
        name: plan
      }
    };
  }
});
