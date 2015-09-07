Package.describe({
  name: 'okgrow:promise',
  version: '0.9.0',
  summary: 'Get a Promise for a Meteor method call. Create async reactive functions using Promises.',
  git: 'https://github.com/okgrow/meteor-promise',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use('ddp', 'client');
  api.addFiles('promise.js', ['client', 'server']);
  api.addFiles('reactivePromise.js', 'client');
  api.export("ReactivePromise", 'client');
});

Npm.depends({
  'es6-promise': '2.0.1' /* TODO meteor add promise */
})

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('okgrow:promise');
  api.use('reactive-var');
  api.use('grigio:babel');
  api.addFiles('tests/support.es6.js', ['client', 'server']);
  api.addFiles('tests/identity-tests.es6.js', ['client', 'server']);
  api.addFiles('tests/chaining-tests.es6.js', ['client', 'server']);
  api.addFiles('tests/error-tests.es6.js', ['client', 'server']);
  api.addFiles('tests/call-wo-callback.es6.js', ['client']);
  api.addFiles('tests/reactive-promise.es6.js', ['client']);
});
