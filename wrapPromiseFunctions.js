  /**
     * @memberOf Meteor
     * @summary Gets a ES6-compatible Promise for the result of a Meteor.callPromise
     * @param {String} name Name of method to invoke
     * @param {EJSONable} [arg1,arg2...] Optional method arguments
     * @returns {Promise}
     */
  Meteor.callPromise = Promise.denodeify(Meteor.call)
	HTTP.callPromise = Promise.denodeify(HTTP.call)
	HTTP.getPromise = Promise.denodeify(HTTP.get)
	HTTP.postPromise = Promise.denodeify(HTTP.post)
	HTTP.putPromise = Promise.denodeify(HTTP.put)
	HTTP.deletePromise = Promise.denodeify(HTTP.delete)

	function addReadyPromise (handle) {
		handle.readyPromise = new Promise(function (resolve) {
			Tracker.autorun(function (computation) {
				if (handle.ready()) {
					resolve(true);
					computation.stop();
				}
			})
		});
	}

	Meteor._subscribe = Meteor.subscribe
	Meteor.subscribe = function (...args) {
    let handle = Meteor._subscribe.apply(Meteor, args)
		addReadyPromise(handle)
    return handle
	}
