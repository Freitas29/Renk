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

const keyNotFound = value => typeof value === "undefined"

class Renk {
    constructor(struct  = {}){
        this.struct = struct
    }

    /*
        const animal = {name: "Lion", Height: 1.2}

        const teste = new Renk(animal)

        teste.renameOnly({ name: "Name"})

        // { Name: "Lion", Height: 1.2 }

    */

    /*
        const person = {firstName: "Luke", lastName: "Skywalker", eyeColor: blue}

        const teste = new Renk(person)

        teste.rename({ Height: ["fullName", person => `${person.firstName} ${person.lastName}`]})

        // { fullName: Luke Skywalker, eyeColor: blue }

    */

    rename(renameKeys = {}){
        const clone = shallowClone(this.struct)
        let objectRenamed = {}
        
        Object.keys(clone).map(key => {
            if(renameKeys.hasOwnProperty(key)){              
                const newKey = renameKeys[key]
                
                const value = this.struct[key]
                

                if(Array.isArray(newKey)){
                    objectRenamed = newObject(clone,changeValueAndKey(newKey, this.struct))
                }else{
                    objectRenamed = newObject(clone, changeKey(newKey, value))
                }

                delete clone[key]
            }
        })

        return objectRenamed
    }

    /*
        const animal = {name: "Lion", Height: 1.2}

        const teste = new Renk(animal)

        teste.renameOnly({ Height: "height"})

        // { height: 1.2 }

    */



    renameOnly(renameKeys = {}){
        const clone = shallowClone(this.struct)
        let objectRenamed = {}

        Object.keys(clone).map(key => {
            if(renameKeys.hasOwnProperty(key)){
                const newKey = renameKeys[key]

                if(Array.isArray(newKey)){

                    objectRenamed =  newObject({ ...objectRenamed }, changeValueAndKey(newKey, this.struct))

                }else{
                    const value = this.struct[key]

                    objectRenamed =  newObject({ ...objectRenamed }, changeKey(newKey, value))
                }

                delete clone[key]
            }
        })

        return objectRenamed
    }

    
}

export default Renk