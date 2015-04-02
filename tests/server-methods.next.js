Meteor.methods({
  identity: val => val,
  MeteorError: () => {
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
