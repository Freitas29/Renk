## 🌠 Instalação

`
npm install renk
`

## 🚩 Uso
```js
  const { rename, renameonly } from 'renk'
```


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

Renomenado as keys do objeto `user`

```js
const renamedUser = rename(user, {
  food: "favoriteFoods",
  firstName: "name"
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

Nesse caso, vamos transformar o objeto `user` e excluir as keys que não desejamos

```js
const renamedUser = rename(user, {
    food: "favoriteFoods",
    firstName: "name"
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

Alterando as keys e transformando os valores passando um array com `[key, function]` e removendo a propriedade `lastName` do objeto `user`

```js
rename(user, {
  firstName: ['fullName', person => `${person.firstName} ${person.lastName}`]
}, ["lastName"])

/*
  {age: 16, gender: "male", food: Array(3), fullName: "Bob Foo"}
*/
```
