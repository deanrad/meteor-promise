Package.describe({
  name: 'okgrow:promise',
  version: '0.9.6',
  summary: 'Utilities for Promise-based wrappers, method calls, helpers and HTTP in Meteor',
  git: 'https://github.com/okgrow/meteor-promise',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use(['ddp', 'http', 'tracker', 'underscore']);
  //api.use('ecmascript');
  api.use('promise@0.4.1');
  api.imply('promise');
  api.addFiles('wrapPromise.js', 'client');
  api.addFiles('reactivePromise.js', 'client');
  api.export("ReactivePromise", 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('reactive-var');
  api.use('meteor-platform');
  api.use('ejson');
  api.use('ecmascript');
  api.use('okgrow:promise');
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
});
