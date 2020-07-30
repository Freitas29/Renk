## Uso

```js
const user = {
    firstName: "Bob", 
    lastName: "Foo", age: 16,
    gender: "male",
    food: [{
        name: "rice"
    },{
        name: "bean"
    }, {
        name: "steak"
    }]
}   
```

Você pode renomear as keys como desejar

```js
const renamedUser = rename(user, {
  food: "favoriteFoods",
  firtName: "name"
})
    
/*
{   
  name: "Bob", 
  lastName: "Foo",
  age: 16,
  gender: "male",
  favoriteFoods: [{
    name: "rice"
  },{
    name: "bean"
  }, {
    name: "steak"
  }]
}
*/
```

Nesse caso, vamos transformar o objeto e excluir as keys que não desejamos

```js
const renamedUser = rename(user, {
    food: "favoriteFoods",
    firtName: "name"
  }, ['gender', 'age', 'lastName'])

  /*
  {   name: "Bob", 
      favoriteFoods: [{
          name: "rice"
      },{
          name: "bean"
      }, {
          name: "steak"
      }]
  }
  */
}
```

Retorna apenas as chaves renomeadas:

```js
renameOnly(user, {
  firstName: ['fullName', person => `${person.firstName} ${person.lastName}`]
})

/*
{
  fulName: "Bob Foo"
}
*/
```

Podemos alterar as chaves e seus valores passando um array com `[key, function]`

```js
rename(user, {
  firstName: ['fullName', person => `${person.firstName} ${person.lastName}`]
}, ["lastName"])

/*
  {age: 16, gender: "male", food: Array(3), fullName: "Bob Foo"}
*/
```
