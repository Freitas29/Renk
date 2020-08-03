declare function rename(baseObject: Object<Any>, keys: Object<Any>, deleteKeys: Array): {
    renamedOject: Object
}

declare function renameOnly(baseObject: Object<Any>, keys: Object<Any>): {
    renamedOject: Object
}
export { rename, renameOnly }