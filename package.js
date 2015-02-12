Package.describe({
  name: 'deanius:promise',
  version: '1.0.0',
  summary: 'Meteor.promise: Get a JQuery Promise for the result of a Meteor.call',
  git: 'http://github.com:chicagogrooves/deanius-meteor-promise.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use(['jquery', 'ddp'], ['client']);
  api.addFiles('deanius:promise.js', ['client']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('deanius:promise');
  api.addFiles('deanius:promise-tests.js');
});
