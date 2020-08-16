[![Codacy Badge](https://app.codacy.com/project/badge/Grade/77b9676cf9ed4aa4b3dec926e32462fa)](https://www.codacy.com/manual/Freitas29/Renk?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Freitas29/Renk&amp;utm_campaign=Badge_Grade)

## 🌠 Instalação

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c05068d0c16e493cb5d3816044c0c588)](https://app.codacy.com/manual/Freitas29/Renk?utm_source=github.com&utm_medium=referral&utm_content=Freitas29/Renk&utm_campaign=Badge_Grade_Dashboard)

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

Renomeando as keys do objeto `user`

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

Retornar apenas as keys renomeadas:

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

`rename` e `renameOnly` podem receber um array como primeiro argumento podendo atualizar toda a estrutura

```js
const foods = [
  {n: "rice", price: 16.50},
  {n: "onion", price: 5.00}
]

rename(foods, {n: "name"})

/*
  [
    {name: "rice", price: 16.50},
    {name: "onion", price: 5.00}
  ]
*/

```

```js
const foods = [
  {n: "rice", price: 16.50},
  {n: "onion", price: 5.00}
]

renameOnly(foods, {n: "name"})

/*
  [
    {name: "rice"},
    {name: "onion"}
  ]
*/

```
