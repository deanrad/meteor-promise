Package.describe({
  name: 'deanius:promise',
  version: '3.1.2',
  summary: 'Utilities for Promise-based wrappers, method calls, helpers and HTTP in Meteor',
  git: 'https://github.com/deanius/meteor-promise',
  documentation: 'README.md'
});

Npm.depends({
  'co': '4.6.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use(['ddp', 'http', 'tracker', 'underscore', 'promise', 'ecmascript']);

  api.imply('promise');

  api.use('cosmos:browserify@0.8.1');
  api.addFiles('client/denodeifyFunctions.js', 'client');
  api.addFiles('client/reactivePromise.js', 'client');
  api.addFiles('client/runAsync.browserify.js', 'client');
  api.export("ReactivePromise", 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('reactive-var');
  api.use('meteor-platform');
  api.use('ejson');
  api.use('ecmascript');
  api.use('deanius:promise');
  api.imply('http');
  api.imply('ejson');
  api.imply('underscore');
  api.addFiles('tests/support.js', ['client', 'server']);
  api.addFiles('tests/identity-tests.js', 'client');
  api.addFiles('tests/chaining-tests.js', 'client');
  api.addFiles('tests/error-tests.js','client');
  api.addFiles('tests/call-wo-callback.js', 'client');
  api.addFiles('tests/reactive-promise.js', 'client');
  api.addFiles('tests/promise-wrapped.js', 'client');
  api.addFiles('tests/subscription-ready.js', 'client');
  api.addFiles('tests/run-async.js', 'client');
});
