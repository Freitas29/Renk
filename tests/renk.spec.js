import Renk from '../src/index'

const initialObject  = {
    firstName: "Bob",
    lastName: "Foo",
    age: 16,
    gender: "male",
    f: [{
        name: "rice"
    },{
        name: "bean"
    }, {
        name: "steak"
    }]
}

test('Should rename key f and return rest', () => {
    const anotherObject = new Renk(initialObject)
    const newObject = anotherObject.rename({f: "favoriteFoods"})
    
    expect(newObject).toEqual(
        expect.objectContaining({
        favoriteFoods: expect.any(Array),
        firstName: expect.any(String),
    }))
});

test('Should rename key f and only favoriteFoods', () => {
    const anotherObject = new Renk(initialObject)
    const newObject = anotherObject.renameOnly({f: "favoriteFoods"})
    
    expect(newObject).toEqual(
        expect.objectContaining({
        favoriteFoods: expect.any(Array),
    }))
});

test('Should rename only key f and not return rest keys', () => {
    const anotherObject = new Renk(initialObject)
    const newObject = anotherObject.renameOnly({f: "favoriteFoods"})
    
    expect(newObject).toEqual(
        expect.not.objectContaining({
        firstName:  expect.any(String),
        lastName: expect.any(String),
        age: expect.any(Number),
        gender: expect.any(String),
    }))

    expect(newObject).toEqual(
        expect.objectContaining({
        favoriteFoods: expect.any(Array),
    }))
});

test("Should change key and value and return rest keys", () => {
    const anotherObject = new Renk(initialObject)
    const newObject = anotherObject.rename({
        firstName: ["fullName", person => `${person.name} ${person.lastName}`]
    })

    expect(newObject).toEqual(
        expect.objectContaining({
        fullName: `${initialObject.name} ${initialObject.lastName}`,
        lastName: expect.any(String),
        age: expect.any(Number),
        gender: expect.any(String),
    }))
})

test("Should change key and value and not return rest keys", () => {
    const anotherObject = new Renk(initialObject)
    const newObject = anotherObject.renameOnly({
        firstName: ["fullName", person => `${person.name} ${person.lastName}`]
    })

    expect(newObject).toEqual(
        expect.objectContaining({
        fullName: `${initialObject.name} ${initialObject.lastName}`,
    }))

    expect(newObject).toEqual(
        expect.not.objectContaining({
        lastName: expect.any(String),
        age: expect.any(Number),
        gender: expect.any(String),    
    }))
})