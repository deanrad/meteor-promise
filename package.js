Package.describe({
  name: 'deanius:promise',
  version: '1.0.4',
  summary: 'Meteor.promise: Get a Promise for the result of a Meteor.call',
  git: 'https://github.com/chicagogrooves/deanius-meteor-promise',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use('jquery', 'client');
  api.use('ddp', 'client');
  api.use('frozeman:q', 'client', {weak: true});
  api.addFiles('deanius:promise.js', ['client']);
});

Package.onTest(function(api) {
  api.addFiles('tests/server-methods.js', ['server']);
  api.use('tinytest');
  api.use('deanius:promise');
  api.addFiles('deanius:promise.js', ['client']);
  api.addFiles('tests/identity-tests.js', ['client']);
  api.addFiles('tests/error-tests.js', ['client']);
});
