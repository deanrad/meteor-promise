Package.describe({
  name: 'deanius:promise',
  version: '2.0.4',
  summary: 'Meteor.promise: Get a ES6-compatible Promise for the result of a `Meteor.call`',
  git: 'https://github.com/deanius/deanius-meteor-promise',
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
  api.use('mquandalle:harmony');
  api.addFiles('deanius:promise.js', ['client', 'server']);
  api.addFiles('tests/server-methods.next.js', ['server']);
  api.addFiles('tests/support.js', ['client', 'server']);
  api.addFiles('tests/identity-tests.next.js', ['client', 'server']);
  api.addFiles('tests/chaining-tests.next.js', ['client', 'server']);
  api.addFiles('tests/error-tests.next.js', ['client', 'server']);
});
