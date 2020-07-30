const shallowClone = obj => Object.assign({}, obj);

const changeKey = (newKey, value) => {
    return {[newKey] : value}
}

const newObject = (oldObject, newObject) => {
    return Object.assign(oldObject , newObject)
}

const isNotFunction = value => typeof value !== "function"

const changeValueAndKey = (newProperty, object) => {
    const [key, value] = newProperty
    
    if(isNotFunction(value)) throw `${value} is not a function`

    const newValue = value(object)

    return changeKey(key, newValue)
}

const hasKey = keys => keys.length > 0

const removeKeys = (baseObject, keys) => {
    const baseclone = shallowClone(baseObject)
    
    keys.map(key => {
        if(!baseclone.hasOwnProperty(key)) return

        delete baseclone[key]
    })

    return baseclone
}

export const rename = (baseObject, renameKeys = {}, deleteKeys = []) => {
    let clone = shallowClone(baseObject)
    let renamedObject = {}
    
    if(hasKey(deleteKeys)){
        clone = removeKeys(clone, deleteKeys)
    }

    Object.keys(clone).map(key => {
        if(renameKeys.hasOwnProperty(key)){              
            const newKey = renameKeys[key]
            
            const value = baseObject[key]
            

            if(Array.isArray(newKey)){
                renamedObject = newObject(clone,changeValueAndKey(newKey, baseObject))
            }else{
                renamedObject = newObject(clone, changeKey(newKey, value))
            }

            delete clone[key]
        }
    })

    return renamedObject
}

export const renameOnly = (baseObject, renameKeys = {}) => {
    const clone = shallowClone(baseObject)
    let renamedObject = {}

    Object.keys(clone).map(key => {
        if(renameKeys.hasOwnProperty(key)){
            const newKey = renameKeys[key]

            if(Array.isArray(newKey)){

                renamedObject =  newObject({ ...renamedObject }, changeValueAndKey(newKey, baseObject))

            }else{
                const value = baseObject[key]

                renamedObject =  newObject({ ...renamedObject }, changeKey(newKey, value))
            }

            delete clone[key]
        }
    })

    return renamedObject
}