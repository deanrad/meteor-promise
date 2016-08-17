ReactifyPromise = (promise, initialValue) => {
    let reactiveVar = new ReactiveVar(initialValue)
    let setVar = reactiveVar.set.bind(reactiveVar)
    // whether promise resolves or rejects
    promise.then(setVar, setVar)
    return reactiveVar
}
