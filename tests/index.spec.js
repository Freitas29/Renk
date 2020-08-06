import { rename, renameOnly } from '../src/index'

const user  = {
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

test('Should reshap key f and return rest', () => {
    const renamedUser = rename(user, {f: "favoriteFoods"})
    
    expect(renamedUser).toEqual(
        expect.objectContaining({
        favoriteFoods: expect.any(Array),
        firstName: expect.any(String),
    }))
});

test('Should reshap key f and only favoriteFoods', () => {
    const renamedUser = renameOnly(user, {f: "favoriteFoods"})
    
    expect(renamedUser).toEqual(
        expect.objectContaining({
        favoriteFoods: expect.any(Array),
    }))
});

test('Should reshap only key f and not return rest keys', () => {
    const renamedUser = renameOnly(user, {f: "favoriteFoods"})
    
    expect(renamedUser).toEqual(
        expect.not.objectContaining({
        firstName:  expect.any(String),
        lastName: expect.any(String),
        age: expect.any(Number),
        gender: expect.any(String),
    }))

    expect(renamedUser).toEqual(
        expect.objectContaining({
        favoriteFoods: expect.any(Array),
    }))
});

test("Should change key and value and return rest keys", () => {
    const renamedUser = rename(user,{
        firstName: ["fullName", person => `${person.name} ${person.lastName}`]
    })

    expect(renamedUser).toEqual(
        expect.objectContaining({
        fullName: `${user.name} ${user.lastName}`,
        lastName: expect.any(String),
        age: expect.any(Number),
        gender: expect.any(String),
    }))
})

test("Should change key and value and not return rest keys", () => {
    const renamedUser = renameOnly(user, {
        firstName: ["fullName", person => `${person.name} ${person.lastName}`]
    })

    expect(renamedUser).toEqual(
        expect.objectContaining({
        fullName: `${user.name} ${user.lastName}`,
    }))

    expect(renamedUser).toEqual(
        expect.not.objectContaining({
        lastName: expect.any(String),
        age: expect.any(Number),
        gender: expect.any(String),    
    }))
})

test("Should throw error when value is not a function in rename function", () => {
    expect(() => {        
        rename(user, {
            firstName: ["fullName", "Bob foo"]
        })
    }).toThrow('Bob foo is not a function');
})

test("Should throw error when value is not a function in rename only function", () => {
    expect(() => {
        
        renameOnly(user, {
            firstName: ["fullName", "Bob foo"]
        })
    }).toThrow('Bob foo is not a function');
})

test("Should return the object emtpy when key is not found in rename function", () => {
    
    const renamedUser = rename(user, {
        name: ["name", person => `${person.name} ${person.lastName}`]
    })

    expect(renamedUser).toEqual({})
})

test("Should return the object emtpy when key is not found in rename only function", () => {    
    const renamedUser = renameOnly(user, {
        name: ["name", person => `${person.name} ${person.lastName}`]
    })

    expect(renamedUser).toEqual({})
})

test("Should reshap object and remove keys", () => {
    const renamedUser = rename(user, {
        firstName: "name"
    }, ["f"])

    expect(renamedUser).toEqual(
        expect.objectContaining({
            name: expect.any(String),
            lastName: expect.any(String),
            age: expect.any(Number),
            gender: expect.any(String),
        })
    )

    expect(renamedUser).toEqual(
        expect.not.objectContaining({
            f: expect.any(Array),
        })
    )
})

const foods = [
    {n: "rice", price: 16.50},
    {n: "onion", price: 5.00}
]

test("Should reshap a array of object", () => {
    const reshaped = rename(foods, {n: "name"})
    
    const expected = [
        {name: "rice", price: 16.50},
        {name: "onion", price: 5.00}
    ]
    
    expect(reshaped).toEqual(
        expect.arrayContaining(expected)
    )
})

test("Should reshap a array and delete a key", () => {
    const reshaped = rename(foods, {n: "name"}, ["price"])
    
    const expected = [
        {name: "rice"},
        {name: "onion"}
    ]
    
    expect(reshaped).toEqual(
        expect.arrayContaining(expected)
    )
})

test("Should reshap a array and return only keys reshaped", () => {
    const reshaped = renameOnly(foods, {n: "name"})
    
    const expected = [
        {name: "rice"},
        {name: "onion"}
    ]

    expect(reshaped).toEqual(
        expect.arrayContaining(expected)
    )
})

test("Should return a object reshaped with delete key that is not exists", () => {
    const reshaped = rename(user, {firstName: "name"}, ["nome", "f"])
    
    const expected = {
        age: 16,
        gender: "male",
        lastName: "Foo",
        name: "Bob"
    }

    expect(reshaped).toStrictEqual(expected)
})


test("Should return the empty object when params is not received in rename", () => {
    const oldUser = JSON.parse(JSON.stringify(user))
    const reshaped = rename(user)

    expect(reshaped).toStrictEqual({})    
    expect(user).toStrictEqual(oldUser)

})

test("Should return the empty object when params is not received in renameOnly", () => {
    const oldUser = JSON.parse(JSON.stringify(user))
    const reshaped = renameOnly(user)

    expect(reshaped).toStrictEqual({})    
    expect(user).toStrictEqual(oldUser)
})