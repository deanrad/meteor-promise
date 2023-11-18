Package.describe({
  name: 'deanius:promise',
  version: '3.1.5',
  summary: 'Utilities for Promise-based wrappers, method calls, helpers and HTTP in Meteor',
  git: 'https://github.com/deanius/meteor-promise',
  documentation: 'README.md'
});

Npm.depends({
  'co': '4.6.0'
});

Package.onUse(function(api) {
  api.versionsFrom(['1.6.1', '2.3']);
  api.use('ecmascript');
  api.use('promise');
  api.imply('promise');
  api.use('reactive-var');
  api.use('ddp');
  api.use('http');
  api.use('tracker');
  api.use('underscore');

  api.addFiles('client/denodeifyFunctions.js', 'client');
  api.addFiles('client/reactivePromise.js', 'client');
  api.addFiles('client/reactifyPromise.js', 'client');
  api.addFiles('client/runAsync.browserify.js', 'client');
  api.export('ReactivePromise', 'client');
  api.export('ReactifyPromise', 'client');
  api.export('PromisifyReactiveVar', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('reactive-var');
  api.use('tracker');
  api.use('mongo');
  api.use('meteor-platform');
  api.use('ejson');
  api.use('ecmascript');
  api.use('deanius:promise');
  api.use('browser-policy');
  api.imply('browser-policy');
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
