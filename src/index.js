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

const reshap = ({ baseObject, clone, renameKeys} ) => {
    let renamedObject = {}

    Object.keys(baseObject).map(key => {
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

const reshapOnly = ({ clone, renameKeys, baseObject }) => {
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

const removeArrayKeys = (baseArray, deleteKeys) => baseArray.map(object => removeKeys(object, deleteKeys)) 

const reshapArray = (baseArray, renameKeys) => {
    return baseArray.map(object => {
        const clone = shallowClone(object)
        
        return reshap({ baseObject: object, clone, renameKeys })
    })
}

const reshapArrayOnly = (baseArray, renameKeys) => {
    return baseArray.map(object => {
        const clone = shallowClone(object)
        
        return reshapOnly({ baseObject: object, clone, renameKeys })
    })
}

export const rename = (baseObject, renameKeys = {}, deleteKeys = []) => {
    if(Array.isArray(baseObject)){
        const clone = Array.from((baseObject))

        const result = reshapArray(clone, renameKeys)

        if(hasKey(deleteKeys)) return removeArrayKeys(result, deleteKeys)

        return result
        
    }else{
        let clone = shallowClone(baseObject)

        if(hasKey(deleteKeys)) clone = removeKeys(clone, deleteKeys)
        
        return reshap({ baseObject, clone, renameKeys })
    }
}

export const renameOnly = (baseObject, renameKeys = {}) => {
    if(Array.isArray(baseObject)){
        const clone = Array.from((baseObject))
        return reshapArrayOnly(clone, renameKeys)
    }else{
        const clone = shallowClone(baseObject)
        return reshapOnly({ baseObject, renameKeys, clone })
    }
}