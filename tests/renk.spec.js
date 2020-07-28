import Renk from '../src/index'

const initialObject  = {
    name: "Bob",
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
        name: expect.any(String),
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
        name:  expect.any(String),
        lastName: expect.any(String),
        age: expect.any(Number),
        gender: expect.any(String),
    }))
});