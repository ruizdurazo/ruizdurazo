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

<!-- --- -->

## JS: How to do if/else statements on a single line: Ternary operators

```js
// Ternary operators use a condition followed by a question mark (?),
// and the two values separated by a colon (trueValue : falseValue)

// Example in pseudocode:
// const result = (something that evaluates to a bool) ? trueValue : falseValue

// Real example:
const someValue = 3
const result = someValue > 5 ? 'Yes' : 'No'

console.log(result)
// Expected output: 'No'
```

<!-- --- -->

## JS: How to check truthiness of items in an Array: Every, Some

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

## JS: How to filter arrays based on some condition: Filter

Filter is a method that arrays have. You provide a callback that will be executed for every item in the array. It can be an arrow function or a function define elsewhere, but it should obviously resolve to a boolean: true or false. All elements that are false will be dropped in the resulting array.

```js
// Array of objects
const words = [
  //
  { word: 'spray' },
  { word: 'juice' },
  { word: 'boop' },
]

// Filter items
const result = words.filter((word) => word.word === 'boop')

console.log(result)
// Expected output: Array [{word: 'boop'}]
```

```js
// Array of strings
const words = [
  //
  'spray',
  'limit',
  'elite',
  'exuberant',
  'destruction',
  'present',
]

const result = words.filter((word) => word.length > 6)

console.log(result)
// Expected output: Array ["exuberant", "destruction", "present"]
```

```js
// Array of numbers
const nums = [2, 5, 10, 20, 50]

const result = nums.filter((num) => num > 16)

console.log(result)
// Expected output: Array [20, 50]
```

<!-- --- -->

## JS: How to join strings with template literals: ${}

```js
// Use dollar sign and curly brackets within backticks `${}`

const foo = `string text ${someVariable} string text`

const bar = `Your total is: ${a + b}`

const baz = `Your total is: ${sum(a, b)}`
```

<!-- --- -->

## JS: How to add items to or replace items in an Array or Object: Spread syntax

```js
// Ellipsis (...), and then add the data

// Spread syntax for an array
// A way to concatenate data:
const items = [...someData, someItem, anotherItem]
```

```js
// Spread syntax for an object
// If the key already exists, it's value will be overwritten
const otherItems = {
  ...someData,
  something: 'hello',
  somethingElse: 10,
}
```

<!-- --- -->

## JS: How to extract items from an Array or Object in a single line: Destructuring

Destructuring is a complex topic, but these are the basics:

```js
// Example array
const foo = ['one', 'two', 'three']

// Destructuring for an array
// Extract one or more values (in order)
const [red, yellow, green] = foo

// Example object
const user = {
  id: 42,
  isVerified: true,
}
```

```js
// Destructuring for an object
// Extract one or more values (based on keys)
const { id, isVerified } = user

// Rename key to `somethingElse`
const { id: somethingElse } = user
```

<!-- --- -->

## JS: How to transform items in an array without using for loops: Map

```js
// Instead of using a for loop or forEach(), use array mapping
// map() takes a callback to apply to each item

const items = [something, somethingElse, some]

const itemsTransformed = items.map((item) => someMethod(item))
```

<!-- --- -->

## JS: How to sort simple arrays: Sort

```js
// Sorting an array of strings
// Default sort order is ascending

const example = ['abc', 'xyz', 'sdf']

example.sort()
// Expected output: Array ['abc', 'sdf', 'xyz']
```

```js
// Sorting an array of numbers

const example = [10, 4, 25]

example.sort()
// Expected output: Array [4, 10, 25]
```

<!-- --- -->

## JS: How to sort an array of objects: Sort

```js
// Instead of using a for loop or forEach(), use sort + a callback,
// or use something like lodash orderBy or sortBy

const objs = [{ varName: 'abc' }, { varName: 'xyz' }, { varName: 'sdf' }]

objs.sort((a, b) =>
  a.varName > b.varName ? 1 : b.varName > a.varName ? -1 : 0
)
```

<!-- --- -->

## JS: How to sort an object: Sort

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

<!-- --- -->

## JS: How to copy text to the clipboard

```js
// Copying something, for example, when clicking a button
// Trigger this within the method you want:
navigator.clipboard.writeText('some text you want to copy')
```

---

If you’d like to get in touch, [DM me on Twitter](https://twitter.com/ruizdurazo) or [send me an email](mailto:enrique@ruizdurazo.com).
