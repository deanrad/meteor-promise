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
	Meteor.subscribe = function (...args) {
    let handle = Meteor._subscribe.apply(Meteor, args)
		addReadyPromise(handle)
    return handle
	}
