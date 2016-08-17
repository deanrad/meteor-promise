ReactifyPromise = (p, iVal) => {
    let rVar = new ReactiveVar(iVal)
    p.then(resolved => rVar.set(resolved))
    return rVar
}
