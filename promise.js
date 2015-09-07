/**
   * @memberOf Meteor
   * @summary Like, Meteor.wrapAsync does for Fibers, Meteor.wrapPromise returns
   *    a function which is just like its argument, but which callers invoke
   *    without passing a callback in the final position, and returning a Promise.
   * @param {function} the function to Promisify
   * @returns {function}
   * @credit https://github.com/matthew-andrews/denodeify/blob/bbc334a90a4b036f491f766ce335fca7bd274109/index.js
   */
Meteor.wrapPromise = function wrapPromise (nodeStyleFunction, filter) {
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
     * @summary Gets a ES6-compatible Promise for the result of a Meteor.promise
     * @param {String} name Name of method to invoke
     * @param {EJSONable} [arg1,arg2...] Optional method arguments
     * @returns {Promise}
     */
  Meteor.promise = Meteor.wrapPromise(Meteor.call)
