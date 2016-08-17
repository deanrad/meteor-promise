ReactifyPromise = (promise, initialValue) => {
    let reactiveVar = new ReactiveVar(initialValue)
    let setVar = reactiveVar.set.bind(reactiveVar)
    // whether promise resolves or rejects
    promise.then(setVar, setVar)
    return reactiveVar
}

PromisifyReactiveVar = (reactiveVar) => {
    return new Promise((resolve) => {
        Tracker.autorun((c) => {
            // We need this function to run the first time, to register to be called back.
            // But once we have the next value we need not depend again.
            // This is why we protect ourselves from depending on any but the first run,
            // and why we prefer to call depend() explicitly rather than rely on implicit
            // behavior hidden inside a reactiveVar.get()
            if (c.firstRun) {
                reactiveVar.dep.depend()
            } else {
                // if you uncomment this you should see this message at most once per value change
                // console.log('resolving with ', reactiveVar.curValue)
                resolve(reactiveVar.curValue)
            }

            // This is the naive version which because it continues to depend by calling get()
            // will print 'resolving with' messages (and call resolve) more than once - bad code!
            // let val = reactiveVar.get()
            // if (!c.firstRun) {
            //     console.log('resolving with ', val)
            //     resolve(val)
            // }
        })
    })
}
