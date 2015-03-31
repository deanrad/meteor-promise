Package.describe({
  name: 'deanius:promise',
  version: '2.0.2',
  summary: 'Meteor.promise: Get a ES6-compatible Promise for the result of a `Meteor.call`',
  git: 'https://github.com/chicagogrooves/deanius-meteor-promise',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use('ddp', 'client');
  api.addFiles('deanius:promise.js', ['client', 'server']);
});

Npm.depends({
  'es6-promise': '2.0.1'
})

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('deanius:promise');
  api.addFiles('tests/server-methods.js', ['server']);
  api.addFiles('deanius:promise.js', ['client', 'server']);
  api.addFiles('tests/identity-tests.js', ['client', 'server']);
  api.addFiles('tests/chaining-tests.js', ['client', 'server']);
  api.addFiles('tests/error-tests.js', ['client', 'server']);
});
