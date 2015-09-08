Package.describe({
  name: 'okgrow:promise',
  version: '0.9.5',
  summary: 'Utilities for Promise-based wrappers, method calls, helpers and HTTP in Meteor',
  git: 'https://github.com/okgrow/meteor-promise',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use(['ddp', 'http', 'tracker']);
  api.use('promise@0.4.1');
  api.imply('promise');
  api.addFiles('wrapPromise.js', 'client');
  api.addFiles('reactivePromise.js', 'client');
  api.export("ReactivePromise", 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('okgrow:promise');
  api.use('reactive-var');
  api.use('grigio:babel');
  api.imply('http');
  api.addFiles('tests/support.es6.js', ['client', 'server']);
  api.addFiles('tests/identity-tests.es6.js', 'client');
  api.addFiles('tests/chaining-tests.es6.js', 'client');
  api.addFiles('tests/error-tests.es6.js','client');
  api.addFiles('tests/call-wo-callback.es6.js', 'client');
  api.addFiles('tests/reactive-promise.es6.js', 'client');
  api.addFiles('tests/promise-wrapped.es6.js', 'client');
  api.addFiles('tests/subscription-ready.es6.js', 'client');
});
