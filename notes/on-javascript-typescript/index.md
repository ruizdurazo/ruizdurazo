---
title: On JavaScript / TypeScript
date: 2021-11-15
description_short: Snippets and tips on JavaScript and TypeScript.
description_long: Snippets and tips on JavaScript and TypeScript.
image:
image_alt:
repository:
author_name: Enrique Ruiz Durazo
author_email: enrique@ruizdurazo.com
author_twitter: ruizdurazo
acknowledgements:
further_reading: true
_:
---

<!-- ## Snippets -->

<!-- --- -->

### JS: Ternary operators (If/else assignment on a single line)

```js
const someValue = 3

// Example: const result = (something that evaluates to a bool) ? trueValue : falseValue
const result = someValue > 5 ? 'Yes' : 'No'

console.log(result)
// Expected output: 'No'
```

<!-- --- -->

### JS: Every, Some (check truthiness of items in an Array)

```js
const nums = [10, 20, 50]

// Just needs some callback that evaluates each element to a boolean
// Example: const result = nums.some(callbackFn)
const resultSome = nums.some((i) => i > 20)
const resultEvery = nums.every((i) => i > 20)

console.log(resultSome)
// Expected output: true

console.log(resultEvery)
// Expected output: false
```

<!-- --- -->

### JS: Filter arrays based on some condition

Filter is a method that arrays have. You provide a callback that will be executed for every item in the array. It can be an arrow function or a function define elsewhere, but it should obviously resolve to a boolean: true or false.

```js
// Array of objects
const words = [{ word: 'spray' }, { word: 'juice' }, { word: 'boop' }]

const result = words.filter((word) => word.word === 'boop')

console.log(result)
// Expected output: Array [{word: 'boop'}]
```

```js
// Array of strings
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']

const result = words.filter((word) => word.length > 6)

console.log(result)
// Expected output: Array ["exuberant", "destruction", "present"]
```

```js
// Array of numbers
const nums = [10, 20, 50]

const result = nums.filter((num) => num > 16)

console.log(result)
// Expected output: Array [20, 50]
```

<!-- --- -->

### JS: Strings with template literals ${}

```js
// Use ${} within backticks

const foo = `string text ${someVariable} string text`

const bar = `Your total is: ${a + b}`

const baz = `Your total is: ${sum(a, b)}`
```

<!-- --- -->

### JS: Transforming items in an array without using for loops

```js
// Instead of using a for loop or forEach(), use array mapping

const items = [...someData]

const itemsTransformed = items.map((item) => someMethod(item))
```

<!-- --- -->

### JS: Sorting a simple array

```js
// Sorting an array or strings or numbers

const example = ['abc', 'xyz', 'sdf']

example.sort()
// Expected output: Array ['abc', 'sdf', 'xyz']
```

<!-- --- -->

### JS: Sorting an array of objects

```js
// Instead of using a for loop or forEach(), use sort + a callback,
// or use something like lodash orderBy or sortBy

const objs = [{ varName: 'abc' }, { varName: 'xyz' }, { varName: 'sdf' }]

objs.sort((a, b) =>
  a.varName > b.varName ? 1 : b.varName > a.varName ? -1 : 0
)
```

<!-- --- -->

### JS: Sorting an object

```js
// Instead of using a for loop or forEach(), use sort + a callback,
// or use something like lodash orderBy or sortBy

const obj = {
  varName1: 'abc',
  varName2: 'xyz',
  varName3: 'sdf',
}

Object.keys(obj).sort(function (a, b) {
  return obj[a] - obj[b]
})
```
