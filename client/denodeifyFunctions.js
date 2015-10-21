// This implementation of denodeify, taken from
// https://github.com/matthew-andrews/denodeify/blob/bbc334a90a4b036f491f766ce335fca7bd274109/index.js
// works in ways that Promise.denodeify does not (meteor-promise-docs shows [Object object]),
// Probably because the Object type returned doesn't pass the test of `instanceof Promise`
denodeify = function denodeify (nodeStyleFunction, filter) {
		'use strict';

		return function () {
			var self = this;
			var functionArguments = new Array(arguments.length + 1);

			for (var i = 0; i < arguments.length; i += 1) {
				functionArguments[i] = arguments[i];
			}

			function promiseHandler (resolve, reject) {
				function callbackFunction () {
					var args = new Array(arguments.length);

					for (var i = 0; i < args.length; i += 1) {
						args[i] = arguments[i];
					}

					if (filter) {
						args = filter.apply(self, args);
					}

					var error = args[0];
					var result = args[1];

					if (error) {
						return reject(error);
					}

					return resolve(result);
				}

				functionArguments[functionArguments.length - 1] = callbackFunction;
				nodeStyleFunction.apply(self, functionArguments);
			}

			return new Promise(promiseHandler);
		};
	};

  /**
     * @memberOf Meteor
     * @summary Gets a ES2015-compatible Promise for the result of a Meteor.promise
     * @param {String} name Name of method to invoke
     * @param {EJSONable} [arg1,arg2...] Optional method arguments
     * @returns {Promise}
     */
  Meteor.callPromise = denodeify(Meteor.call)
	Meteor.wrapPromise = denodeify
	HTTP.callPromise = denodeify(HTTP.call)
	HTTP.getPromise = denodeify(HTTP.get)
	HTTP.postPromise = denodeify(HTTP.post)
	HTTP.putPromise = denodeify(HTTP.put)
	HTTP.deletePromise = denodeify(HTTP.delete)

	addReadyPromise = (handle) => {
		handle.readyPromise = () =>
      new Promise((resolve) => {
  			Tracker.autorun((computation) => {
  				if (handle.ready()) {
            //resolving invokes 'then' steps async, just like computation invalidations
  					resolve(true)
  					computation.stop()
  				}
  			})
  		})
	}

	Meteor._subscribe = Meteor.subscribe
	Meteor.subscribe = function () {
		var handle = Meteor._subscribe.apply(Meteor, arguments);
		addReadyPromise(handle);
		return handle;
	}
