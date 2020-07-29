import { shallowClone } from './utils.js'

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

export const rename = (baseObject, renameKeys = {}) => {
    const clone = shallowClone(baseObject)
    let objectRenamed = {}
    
    Object.keys(clone).map(key => {
        if(renameKeys.hasOwnProperty(key)){              
            const newKey = renameKeys[key]
            
            const value = baseObject[key]
            

            if(Array.isArray(newKey)){
                objectRenamed = newObject(clone,changeValueAndKey(newKey, baseObject))
            }else{
                objectRenamed = newObject(clone, changeKey(newKey, value))
            }

            delete clone[key]
        }
    })

    return objectRenamed
}

export const renameOnly = (baseObject, renameKeys = {}) => {
    const clone = shallowClone(baseObject)
    let objectRenamed = {}

    Object.keys(clone).map(key => {
        if(renameKeys.hasOwnProperty(key)){
            const newKey = renameKeys[key]

            if(Array.isArray(newKey)){

                objectRenamed =  newObject({ ...objectRenamed }, changeValueAndKey(newKey, baseObject))

            }else{
                const value = baseObject[key]

                objectRenamed =  newObject({ ...objectRenamed }, changeKey(newKey, value))
            }

            delete clone[key]
        }
    })

    return objectRenamed
}