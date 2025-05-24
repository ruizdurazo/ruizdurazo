---
title: On JavaScript & TypeScript
date: 2024-11-29
description_short: Snippets and tips on JavaScript and TypeScript.
description_long: Snippets and tips on JavaScript and TypeScript.
image:
image_alt:
repository:
author_name: Enrique Ruiz Durazo
author_email: enrique@ruizdurazo.com
author_x: ruizdurazo
acknowledgements:
further_reading: true
_:
---

## Intro

The whole world runs on JavaScript.

![JavaScript](./images/javascript.png "It do be like that")[size: l, aspect: 672x840]

Here's a list of notes and snippets I've found useful.

<!-- --- -->

## [JS] JavaScript 101

```js
// Variables
const x = 10 // const is used for variables that cannot be reassigned
let y = 20 // let is used for variables that can be reassigned
y = 30 // Valid
x = 40 // Invalid, will throw an error
const z = x + y
const name = 'Spike'
const isBountyHunter = true

// Functions or methods
function add(a, b) {
  return a + b
}

// Arrow functions
const add = (a, b) => a + b // Same as above, but shorter

// Calling a function
const result = add(x, y)
console.log(result)
// Expected output: 40

// Objects (dictionaries in Python)
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
}

// Arrays (or lists)
const numbers = [1, 2, 3, 4, 5]
const words = ['hello', 'there', 'space', 'cowboy']

// Looping
// There's `for`, `while`, and `forEach` (for arrays),
// but there's also `map`, `filter`, etc.
// which go through every item in an array,
// and apply a function to it.
// For example, if you want to square every item in an array:
const squared = numbers.map(x => x * x)
console.log(squared)
// Expected output: Array [1, 4, 9, 16, 25]

// Conditionals
if (x > 0) {
  console.log('x is positive')
} else if (x === 0) {
  console.log('x is zero')
} else {
  console.log('x is negative')
}
// Expected output: 'x is positive'

// That's it. 
// (There's a bit more, of course, 
// but that's already like 80% of it.)
```


## [JS] Typical headaches: Callback hell, Undefined, NaN, Type coercion, Truthiness, Shallow copies

If you thought JS was going to be easy, you're in for a couple (unpleasant) surprises.

```js
// 1. Async code: Callback hell and race conditions
// Some code runs immediately, some code runs later.
// And that's before considering when the responses get back.
// Sometimes you lose track of what's being called and when,
// and you'll probably want to kill yourself.

// Example:
// The timeout runs *after* the synchronous code, even with a delay of 0.
console.log('Start')
setTimeout(() => console.log('Timeout'), 0)
console.log('End')
// Expected output: 'Start' 'End' 'Timeout'

// - - - - - - - - - -

// 2. Undefined vs null
// In Python, `None` is used to represent no value,
// and you can't declare a variable without a value.
// But in JS land, you can.
// `undefined` means a variable has been declared but not assigned a value.
// `null` is an assignment value that represents no value, similar to `None` in Python.

// Examples:
let x
console.log(x)
// Expected output: undefined
let y = null
console.log(y)
// Expected output: null

// They're not the same type, and things get weird:
console.log(typeof undefined)
// Expected output: 'undefined'
console.log(typeof null)
// Expected output: 'object'

// Also, since you can declare a variable without a value,
// you'll eventually see `undefined` without getting errors.
// Why? Because you can do this:
const foo = {}
console.log(foo.bar)
// Expected output: undefined

// And that isn't an error.
// You can already see how it'll hit the fan 
// when working with JSON data, for example.
// Welcome to JS :)

// - - - - - - - - - -

// 3. Math on meth (Part 1): NaN
// `NaN` stands for "Not a Number"
// It's another JS quirk.
// It's basically a value that wanted to be a number,
// but couldn't.

// Examples:
console.log(0 / 0)
// Expected output: NaN

// The weird part: `NaN` is not equal to itself
console.log(NaN === NaN)
// Expected output: false

// You need to use `isNaN()` to check for `NaN`
// Example:
console.log(isNaN(NaN))
// Expected output: true

// - - - - - - - - - -

// 4. Math on meth (Part 2): Type coercion
// JS tries to be helpful by automatically converting types
// Which is nice, but it's also really scary.

// Examples:
// Addition and subtraction
// Adds strings
console.log(5 + '5')
// Expected output: '55'
// Subtracts numbers
console.log('5' - 2)
// Expected output: 3

// Equality operators
// `==` with type coercion
console.log(5 == '5')
// Expected output: true
// `===` without type coercion (for strict comparison)
console.log(5 === '5')
// Expected output: false

// - - - - - - - - - -

// 5. Truthiness
// You need to know how things evaluate to true or false,
// because you can run into some more fun surprises in JS.
// The following values are always "falsy":
// false, 0, '', null, undefined, NaN
// Everything else is "truthy".

// Examples:
console.log(Boolean(0))
// Expected output: false
console.log(Boolean('0'))
// Expected output: true

// - - - - - - - - - -

// 6. Shallow copies
// When you copy an object, you're copying the reference, not the value.
// This means that if you change the original object, the copy will also change,
// and vice versa!

// Example:
const original = { a: 1, b: 2 }
const copy = original
copy.a = 10
console.log(original)
// Expected output: { a: 10, b: 2 }
```

<!-- --- -->

## [JS] Useful built-in objects and functions: Math, Number, String, Array, Object, Date, Intl

- `Math`
- `Number`
- `String`
- `Array`
- `Object`
- `Date`
- `Intl`

```js
// No need to import like in Python, just use them directly.

// 1. Math
Math.random() // Pseudo-random between 0 and 1
Math.floor(0.5) // Round down to nearest integer (0)
Math.ceil(0.5) // Round up to nearest integer (1)
Math.round(0.5) // Round to nearest integer (1)
Math.abs(-5) // Absolute value (5)
Math.max(1, 2, 3) // Maximum value (3)
Math.min(1, 2, 3) // Minimum value (1)
Math.sqrt(16) // Square root (4)
Math.pow(2, 3) // 2^3 (8)
Math.PI // (3.14159...)
// ... and other math functions like cos, log, etc.

// - - - - - - - - - -

// 2. Numbers
const num = 10.1244
num.toFixed(2) // Round to 2 decimal places as string ('10.12')

// - - - - - - - - - -

// 3. Arrays
const numbers = [1, 2, 3, 4, 5]
numbers.push(6) // Add to end ([1, 2, 3, 4, 5, 6])
numbers.unshift(0) // Add to start ([0, 1, 2, 3, 4, 5, 6])
numbers.pop() // Remove from end ([0, 1, 2, 3, 4, 5])
numbers.shift() // Remove from start ([1, 2, 3, 4, 5])
numbers.reverse() // ([5, 4, 3, 2, 1])
// Splice: remove n items from an array at some starting point
numbers.splice(2, 1) // Remove 1 item at index 2 ([1, 2, 4, 5])
// Slice: get part of an array with a start (and end)
letters = ['a', 'b', 'c', 'd', 'e'] // Reset
letters.slice(1) // Items from index 1 to end (['b', 'c', 'd', 'e'])
letters = ['a', 'b', 'c', 'd', 'e'] // Reset
letters.slice(1, 3) // Items from index 1 to 3, not including 3 (['b', 'c'])
letters = ['a', 'b', 'c', 'd', 'e'] // Reset
letters.slice(0, -1) // Items from start to end-1 (['a', 'b', 'c', 'd'])
// ... and other array methods like `map()`, `filter()`, `sort()`, `every()`, `some()`, etc.
// (more on those below)

// - - - - - - - - - -

// 4. Objects
const user = {
  name: 'Harry Potter',
  email: 'harry.potter@hogwarts.com',
  age: 30,
}
Object.keys(user) // ['name', 'email', 'age']
Object.values(user) // ['Harry Potter', 'harry.potter@hogwarts.com', 30]
Object.entries(user) // [['name', 'Harry Potter'], ['email', 'harry.potter@hogwarts.com'], ['age', 30]]
// and also `Object.groupBy()` (more on that below)

// - - - - - - - - - -

// 5. Strings
const phrase = "You're a wizard, Harry. "
phrase.toUpperCase() // "YOU'RE A WIZARD, HARRY. "
phrase.toLowerCase() // "you're a wizard, harry. "
phrase.split(',') // ["You're a wizard", "' Harry. "]
// Remove whitespace at start and end
phrase.trim() // "You're a wizard, Harry."
// Editing
phrase.replace('Harry', 'Ron') // "You're a wizard, Ron. "
phrase.replaceAll('r', 'x') // "You'xe a wizaxd, Haxxy. "
// Substrings
phrase.substring(0, 10) // "You're a wizar"
phrase.slice(0, 10) // "You're a wizar"
phrase.slice(-10) // 'rd, Harry. '
// True/false checks
phrase.startsWith('You') // true
phrase.endsWith('Harry') // true
phrase.includes('wizard') // true
// Regex matching
phrase.match(/wizard/g) // ['wizard']

// - - - - - - - - - -

// 6. Dates
// Date time string format:
// YYYY-MM-DDTHH:mm:ss.sssZ
const date = new Date('2025-01-01')
const now = new Date()
// Get parts of the date
date.getFullYear() // 2025
date.getMonth() // 0 (January)
date.getDate() // 1
// Editing the date (e.g. changing the year)
date.setFullYear(2026) // 2026-01-01
// Adding and subtracting dates (e.g. adding 1 day)
date.setDate(date.getDate() + 1) // 2026-01-02

// - - - - - - - - - -

// 7. Intl
// `Intl.DateTimeFormat` or directly on the date object
// Formatting dates
const options = { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric'
  // ... and more
}
date.toLocaleDateString('en-US', options) // 'January 2, 2026'
date.toLocaleDateString('de', options) // '1. Januar 2026'
// Formatting time (hours, minutes, seconds)
const timeOptions = { hour: '2-digit', minute: '2-digit' }
date.toLocaleTimeString('en-US', timeOptions) // '12:00 AM'
date.toLocaleTimeString('de', timeOptions) // '00:00'

// `Intl.NumberFormat` or directly on the number
// Formatting numbers ('currency', 'decimal', 'percent', 'unit')
const number = 1000
// Currency
const numberCurrencyDollarOptions = {
  style: 'currency', 
  currency: 'USD'
}
number.toLocaleString('en-US', numberCurrencyDollarOptions) // '$1,000.00'
const numberCurrencyEuroOptions = {
  style: 'currency', 
  currency: 'EUR',
  currencyDisplay: 'name'
}
number.toLocaleString('de', numberCurrencyEuroOptions) // '1.000,00 Euro'
// Decimal
const numberDecimalOptions = {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}
number.toLocaleString('en-US', numberDecimalOptions) // '1,000.00'
number.toLocaleString('de', numberDecimalOptions) // '1.000,00'
// Percent
const percentNumber = 0.5
const numberPercentOptions = { style: 'percent' }
percentNumber.toLocaleString('en-US', numberPercentOptions) // '50%'
// Unit
const numberUnitOptions = {
  style: 'unit',
  unit: 'kilogram',
  unitDisplay: 'short'
}
number.toLocaleString('en-US', numberUnitOptions) // '1,000 kg'

// For `Intl.RelativeTimeFormat` (e.g. "1 day ago"),
// you can check my "On CSS/SCSS & Styling" notes.
```

<!-- --- -->

## [JS] How to do if/else statements on a single line: Ternary operators

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

## [JS] How to check truthiness of items in an Array: Every, Some

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

## [JS] How to check if a value exists in an Array: Includes

```js
const nums = [10, 20, 50]

// Just needs some value to try to find in the array
const result = nums.includes(20)

console.log(result)
// Expected output: true
```

<!-- --- -->

## [JS] How to filter arrays based on some condition: Filter

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

// Filter items
const result = words.filter((word) => word.length > 6)

console.log(result)
// Expected output: Array ["exuberant", "destruction", "present"]
```

```js
// Array of numbers
const nums = [2, 5, 10, 20, 50]

// Filter items
const result = nums.filter((num) => num > 16)

console.log(result)
// Expected output: Array [20, 50]
```

<!-- --- -->

## [JS] How to join strings with template literals: ${}

```js
// Use dollar sign and curly brackets within backticks `${}`

const someVariable = 'more string text'

console.log(`string text ${someVariable} string text`)
// Expected output: 'string text more string text string text'

const a = 5
const b = 10

console.log(`Your total is: ${a + b}`)
// Expected output: 'Your total is: 15'

console.log(`Your total is: ${sum(a, b)}`)
// Expected output: 'Your total is: 15'
```

<!-- --- -->

## [JS] How to add items to or replace items in an Array or Object: Spread syntax

```js
// Ellipsis (...), and then add the data

const someData = [14, 3]
const someItem = 4
const anotherItem = 15
const someOtherData = [11, 2]

// Spread syntax for an array
// A way to concatenate data:
const items = [...someData, someItem, anotherItem, ...someOtherData]

console.log(items)
// Expected output: Array [14, 3, 4, 15, 11, 2]
```

```js
const someData = {
  example: 12,
  anotherExample: false,
  something: 'hi',
}

// Spread syntax for an object
// A way to add on to the object
// If the key already exists, it's value will be overwritten
const otherItems = {
  ...someData,
  something: 'hello',
  somethingElse: 10,
}

console.log(otherItems)
// Expected output: Object {
//   example: 12,
//   anotherExample: false,
//   something: 'hello',
//   somethingElse: 10,
// }
```

```js
// You can merge objects using the spread syntax

const obj1 = { foo: 'bar', x: 42 }
const obj2 = { foo: 'baz', y: 13 }

const clonedObj = { ...obj1 }
console.log(clonedObj)
// Expected output: Object { foo: "bar", x: 42 }

const mergedObj = { ...obj1, ...obj2 }
console.log(mergedObj)
// Expected output: Object { foo: "baz", x: 42, y: 13 }
```

<!-- --- -->

## [JS] How to extract items from an Array or Object in a single line: Destructuring

Destructuring is a complex topic, but these are the basics:

```js
// Example with an array
const foo = ['one', 'two', 'three']

// Destructuring for an array
// Extract one or more values (in order)
const [red, yellow, green] = foo

console.log(red)
// Expected output: 'one'
```

```js
// Example with an object
const user = {
  id: 42,
  isVerified: true,
}

// Destructuring for an object
// Extract one or more values (based on their keys)
const { id, isVerified } = user

console.log(id, isVerified)
// Expected output: 42 true

// Rename key to `somethingElse`
const { id: somethingElse } = user

console.log(somethingElse)
// Expected output: 42
```

<!-- --- -->

## [JS] How to transform items in an array without using for loops: Map

Apply some method to every single item in an array.

```js
// Instead of using a for loop or forEach(), use array mapping
// map() takes a callback to apply to each item

const items = [1, 2, 3, 4]

const someMethod = (value) => {
  return value ** 2
}

// Example that produces the square of every item
const itemsTransformed = items.map((item) => someMethod(item))

console.log(itemsTransformed)
// Expected output: Array [1, 4, 9, 16]
```

<!-- --- -->

## [JS] How to sort simple arrays: Sort

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

// Warning: JS is wild
// This DOESN'T work as expected, it converts numbers to strings:
const wrongResult = example.sort()

console.log(wrongResult)
// Expected output: Array [10, 25, 4]

// This works for numbers:
const correctResult = example.sort((a, b) => a - b)
// or:
// example.sort(function (a, b) {
//   return a - b
// })

console.log(correctResult)
// Expected output: Array [4, 10, 25]
```

<!-- --- -->

## [JS] How to sort an array of objects: Sort

Sort the objects in an array according to the value of a single key.

```js
// Instead of using a for loop or forEach(), use sort + a callback
// or use something like lodash orderBy or sortBy

// For strings
const objs = [{ varName: 'abc' }, { varName: 'xyz' }, { varName: 'sdf' }]

const sorted = objs.sort((a, b) =>
  a.varName > b.varName ? 1 : b.varName > a.varName ? -1 : 0
)
// or:
// objs.sort(function (a, b) {
//   return a.varName > b.varName ? 1 : b.varName > a.varName ? -1 : 0
// })
console.log(sorted)
// Expected output: Array [
//   { varName: 'abc' },
//   { varName: 'sdf' },
//   { varName: 'xyz' }
// ]
```

```js
// For numbers
const objs = [{ varName: 0 }, { varName: 30 }, { varName: 10 }]

const sorted = objs.sort((a, b) =>
  a.varName > b.varName ? 1 : b.varName > a.varName ? -1 : 0
)
// or:
// objs.sort(function (a, b) {
//   return a.varName > b.varName ? 1 : b.varName > a.varName ? -1 : 0
// })
console.log(sorted)
// Expected output: Array [
//   { varName: 0 },
//   { varName: 10 },
//   { varName: 30 },
// ]
```

<!-- --- -->

## [JS] How to sort an object: Sort

This is kind of dumb, but it can be done. This is impossible in Python because dictionaries in Python don't care about the order of the keys, they get stored in a hash tree.

```js
// For numbers
const obj = {
  varName1: 0,
  varName2: 30,
  varName3: 10,
}

// Literally creating a "sorted" object
// Sorting for numbers and strings:
// .sort((a, b) => a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0)
// For only numbers, sorting can be:
// .sort(([, a], [, b]) => a - b))
// or:
// .sort((a, b) => a[1] - b[1])
// Use Object.fromEntries() to create the new sorted object
const sortedObj = Object.fromEntries(
  Object.entries(obj).sort((a, b) => (a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0))
)
// or:
// Object.fromEntries(
//   Object.entries(obj).sort(function (a, b) {
//     return a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0)
//   })
// )
console.log(sortedObj)
// Expected output: Object {
//   varName1: 0,
//   varName3: 10,
//   varName2: 30,
// }

// Creating a sorted array of arrays from the original object
const sortedArr = Object.entries(obj).sort((a, b) =>
  a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0
)
// or:
// Object.entries(obj).sort(function (a, b) {
//   return a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0
// })
console.log(sortedArr)
// Expected output: Array [
//   [varName1: 0],
//   [varName3: 10],
//   [varName2: 30],
// ]
```

```js
// For strings
const obj = {
  varName1: 'asd',
  varName2: 'zxc',
  varName3: 'qwe',
}

// Literally creating a "sorted" object
// Sorting for numbers and strings:
// .sort((a, b) => a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0)
// Use Object.fromEntries() to create the new sorted object
const sortedObj = Object.fromEntries(
  Object.entries(obj).sort((a, b) => (a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0))
)
// or:
// Object.fromEntries(
//   Object.entries(obj).sort(function (a, b) {
//     return a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0
//   })
// )
console.log(sortedObj)
// Expected output: Object {
//   varName1: 'asd',
//   varName3: 'qwe',
//   varName2: 'zxc',
// }

// Creating a sorted array of arrays from the original object
const sortedArr = Object.entries(obj).sort((a, b) =>
  a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0
)
// or:
// Object.entries(obj).sort(function (a, b) {
//   return a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0
// })
console.log(sortedArr)
// Expected output: Array [
//   [varName1: 'asd'],
//   [varName3: 'qwe'],
//   [varName2: 'zxc'],
// ]
```

<!-- --- -->

## [JS] How to aggregate data in an array of objects: GroupBy, Reduce

Lots of data analysis tools have a way to aggregate data. They often have some tools called `groupBy` and `reduce`, and JS has them too. You can use them to group data by a key's value or some condition.

```js
// Grouping by a single key

// Example 1:
const products = [
  { name: 'apple', price: 10, category: 'fruit' },
  { name: 'banana', price: 20, category: 'fruit' },
  { name: 'carrot', price: 30, category: 'vegetable' },
  { name: 'orange', price: 40, category: 'fruit' },
]

// Group them by category name
const groupedProducts = Object.groupBy(products, (product) => product.category)

console.log(groupedProducts)
// Expected output: Object {
//   fruit: [
//     { name: 'apple', price: 10, category: 'fruit' },
//     { name: 'banana', price: 20, category: 'fruit' },
//     { name: 'orange', price: 40, category: 'fruit' },
//   ],
//   vegetable: [
//     { name: 'carrot', price: 30, category: 'vegetable' },
//   ],
// }

// - - - - - - - - - -

// Example 2:
const countries = [
  { name: 'USA', population: 330, continent: 'North America' },
  { name: 'Canada', population: 37, continent: 'North America' },
  { name: 'Mexico', population: 126, continent: 'North America' },
  { name: 'France', population: 67, continent: 'Europe' },
  { name: 'Germany', population: 83, continent: 'Europe' },
  { name: 'Italy', population: 60, continent: 'Europe' },
  { name: 'Japan', population: 126, continent: 'Asia' },
  { name: 'China', population: 1402, continent: 'Asia' },
  { name: 'India', population: 1380, continent: 'Asia' },
]

// Group them by population size (you can obviously do more complex conditions)
const groupedCountries = Object.groupBy(countries, ((country) => country.population > 100 ? 'Large' : 'Small'))

console.log(groupedCountries)
// Expected output: Object {
//   Large: [
//     { name: 'USA', population: 330, continent: 'North America' },
//     { name: 'China', population: 1402, continent: 'Asia' },
//     { name: 'India', population: 1380, continent: 'Asia' },
//     { name: 'Mexico', population: 126, continent: 'North America' },
//     { name: 'Japan', population: 126, continent: 'Asia' },
//   ],
//   Small: [
//     { name: 'Canada', population: 37, continent: 'North America' },
//     { name: 'France', population: 67, continent: 'Europe' },
//     { name: 'Germany', population: 83, continent: 'Europe' },
//     { name: 'Italy', population: 60, continent: 'Europe' },
//   ],
// }

// - - - - - - - - - -

// Example 3:
// Group the countries by continent, and sum the population of each continent
// Using `Array.reduce()` directly, looping through each country in the array
// `acc` is the accumulator, which is the object that will be returned in the end
const reducedCountries = countries.reduce((acc, country) => {
  acc[country.continent] = (acc[country.continent] || 0) + country.population
  return acc
}, {})

console.log(reducedCountries)
// Expected output: Object {
//   'North America': 493,
//   Europe: 210,
//   Asia: 2908,
// }
```

<!-- --- -->

## [JS] How to copy text to the clipboard

```js
// Copying something, for example, when clicking a button
// Trigger this within the method you want:
navigator.clipboard.writeText('some text you want to copy')
```

<!-- --- -->

## [JS] How to add decimals

**Warning**: 0.1 + 0.2 _does not equal_ 0.3!!

```js
// Computers are wild
// Computers are binary
// So floating point math can be weird

const check = 0.1 + 0.2 === 0.3
console.log(check)
// Expected output: false

const result = 0.1 + 0.2
console.log(result)
// Expected output: 0.30000000000000004

// But why? Well, in binary64:
// 0.1 isn't 0.1
// 0.1 is actually 0.1000000000000000055511151231257827021181583404541015625

// The problem is that numbers are represented as:
// "A whole number times a power of two".
// So rational numbers such as 0.1 (which is 1/10),
// have a denominator which is NOT a power of two,
// and therefore cannot be exactly represented.

// 2 solutions:
// + 1. Truncate decimals by rounding the numbers (e.g. using `toFixed()`)
// or
// + 2. Convert to integers, do arithmetic, then convert result back to decimals

// Solution 1
// Set number of decimal places needed using `toFixed()`
// toFixed returns a string, the `+` converts the string into a number
const correct1 = +(0.1 + 0.2).toFixed(12) // 12 decimal places is still a safe bet
console.log(correct1)
// Expected output: 0.3

// Solution 2
// Brute force option of converting your decimals into whole numbers,
// and then back to decimals after doing the operation
const factor = 1000
const numbers = [0.1, 0.2]
const correct2 = numbers.reduce((x, y) => (x * factor + y * factor) / factor)
console.log(correct2)
// Expected output: 0.3
```

<!-- --- -->

## [JS] How to save data on the browser: Local Storage

You can save data on the browser itself using `localStorage`. It's a key-value store that persists across browser sessions. It can only store strings, so objects need to be stringified with `JSON.stringify()`.

You typically use `localStorage` to save data like user preferences: light/dark mode, locale, etc.

`localStorage` is for small amounts of data that you want to persist across browser sessions. For larger amounts of data, you can use `IndexedDB` instead, which is also on the browser.

```js
// Storing a simple string
localStorage.setItem('username', 'john_doe')

// Storing an object (must be converted to string first)
const userPreferences = { theme: 'dark', fontSize: 'large' }
localStorage.setItem('preferences', JSON.stringify(userPreferences))

// Retrieving a simple string
const username = localStorage.getItem('username')
console.log(username)
// Expected output: 'john_doe'

// Retrieving an object (must be parsed from string)
const preferences = JSON.parse(localStorage.getItem('preferences'))
console.log(preferences)
// Expected output: Object { theme: 'dark', fontSize: 'large' }

// Removing an item
localStorage.removeItem('username')

// Clearing all items
localStorage.clear()
```

<!-- --- -->

## [JS] How to prevent typing certain characters in form inputs

You can prevent users from typing certain characters in an input by checking the `event.key` property. There are a couple of ways to do this. 

I prefer the second method, because it's more flexible, readable, and sets explicit control over what characters are allowed.

```js
// Example assuming HTML: <input type="text" id="numericInput">

// Method 1: Using regex to allow only numbers
document.getElementById('numericInput').addEventListener('input', function(event) {
  // Replace any non-numeric characters with empty string
  event.target.value = event.target.value.replace(/[^0-9]/g, '')
})

// Method 2: Using keydown event to prevent character entry
document.getElementById('numericInput').addEventListener('keydown', function(event) {
  // Allow: backspace, delete, tab, escape, enter, and numbers
  if (
    event.key === 'Backspace' ||
    event.key === 'Delete' ||
    event.key === 'Tab' ||
    event.key === 'Escape' ||
    event.key === 'Enter' ||
    /^[0-9]$/.test(event.key)
  ) {
    // Do nothing
    return
  } else {
    // Prevent the default action (typing the character)
    event.preventDefault()
  }
})
```

<!-- --- -->

## [JS] How to chain functions / methods: Pipe, Reduce

A `pipe` is a functional programming concept that allows you to pass a value through a series or chain of functions, from left to right. 

It automatically passes the result of each function as the argument to the next function in the chain. I think it's not very commonly used, but I think it looks cool.

```js
// The pipe function takes any number of functions as arguments,
// and then returns a new function that passes its argument
// through each function, in sequence.
pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x)

// Idea:
// pipe(function1, function2, function3, etc.)(element)

// Example usage:
const add2 = x => x + 2
const multiply3 = x => x * 3
const toString = x => `Result: ${x}`

// Create a pipeline of operations
const calculate = pipe(add2, multiply3, toString)

console.log(calculate(5))
// Expected output: 'Result: 21'

// Reasoning:
// add2(5) = 5 + 2 = 7
// multiply3(7) = 7 * 3 = 21
// toString(21) = 'Result: 21'
```

<!-- --- -->

## [TS] TypeScript 101

JavaScript is famous for its ease, flexibility, *and the errors and headaches that can come with it!*

This is because JavaScript is *dynamically typed*, which means that variables can hold values of different types at different times. The errors that this flexibility can lead to are then only caught at runtime, and can be difficult to catch and annoying to debug.

TypeScript tries to fix this. 

TypeScript is a *statically typed* language that is a *superset* of JavaScript. So it ultimately compiles down to JavaScript, and that's why we can catch errors ahead of time.

It makes your code more robust, and makes your coding more enjoyable.

Key benefits of TypeScript:

- Type safety and catching errors at compile-time instead of runtime
- Improving code quality and maintainability
- Tooling for better visibility and confidence with type inference and intellisense in IDEs
- Providing better documentation and clarity through type annotations


```js
// JavaScript examples

// 1. Variables in JS
const x = 10
x = 'hello' // No error
x = '10' // No error

const user = { name: "Alice", age: 25 };

// IDE may not know what `user` contains without explicit comments or runtime inspection.
console.log(user.email); // Undefined but no warning.

// - - - - - - - - - -

// 2. Functions in JS
function add(a, b) {
  return a + b
}

console.log(add(10, '20'))
// Expected output: '1020' 
// No error, unexpected concatenation
```

```ts
// TypeScript examples

// 1. Variables in TS
const x = 10
x = 'hello' // Error: Type 'string' is not assignable to type 'number'.
x = '10' // Error: Type 'string' is not assignable to type 'number'.

interface User {
  name: string;
  age: number;
  email?: string; // Optional property
}

const user: User = { name: "Alice", age: 25 };

// Error: Property 'email' does not exist on type 'User'.
console.log(user.email?.toUpperCase());

// - - - - - - - - - -

// 2. Functions in TS
function add(a: number, b: number): number {
  return a + b
}

// Error: Argument of type 'string' is not assignable to parameter of type 'number'.
console.log(add(10, '20'))
```

<!-- --- -->

## [TS] How and when to declare Types and Interfaces

In TypeScript, `type` is what you'll use the most (duh). But `type` and `interface` can be slightly confusing since they can look very similar when dealing with objects. They are usually interchangeable, and in general, you'll probably default to using `type` as much as possible.

```ts
// 
// 1. Type
// 
// Use for:
// - Simple types (primitives)
// - Complex types (objects)
// - Advanced types (mapped types, conditional types, etc.)
// - Arrays of a single type
// - Arrays of complex types
// - Tuples
// - Unions
// - When you don't need to extend

// Type examples:
// - Simple types (primitives)
type Name = string
type Age = number

// - Complex types (objects)
type Person = {
  name: string
  age: number
  nickname?: string // Optional property
}

// - Advanced types (mapped types, conditional types, etc.)
type ReadOnly<T> = {
  readonly [P in keyof T]: T[P]
}

// - Arrays of a single type
type Numbers = number[]

// - Arrays of complex types
type People = Person[]

// - Tuples
type Coordinates = [number, number]

// - Unions
type ID = string | number  

// - - - - - - - - - -

// 
// 2. Interface
// 
// Use for: 
// - Objects that may need to be extended later

// Interface examples:
interface User {
  id: number
  username: string
  email: string
  nickname?: string // Optional property
  readonly createdAt: Date // Readonly property
}

// Simple type annotation
const count: number = 0
// Complex type annotation
const person: Person = { name: 'John', age: 30 }

// Declaring what type a function will return
function getId(): ID {
  return Math.random() > 0.5 ? 123 : 'abc123'
}

// Function parameters with types
function greet(user: User): string {
  return `Hello, ${user.username}!`
}
```

<!-- --- -->

## [TS] How to extend a Type or Interface: Extends, &

You'll probably have to extend a type or interface from time to time. It's easy to do, but it's slightly annoying because it can easily get messy and unnecessarily hard to read.

You can extend an `interface` with `extends`, and combine a `type` with `&`.

```ts
// Extending interfaces
interface BaseUser {
  id: number
  username: string
}

// Extend with interface extends keyword
interface AdminUser extends BaseUser {
  role: 'admin'
  permissions: string[]
}

// Multiple inheritance
interface SuperAdmin extends AdminUser {
  superPowers: boolean
}

// Extending types
type Animal = {
  name: string
}

// Extend with intersection type (&)
type Dog = Animal & {
  breed: string
}

// Extending a type with an interface
interface Pet {
  owner: string
}

// Type can extend interface (and vice versa)
type DomesticDog = Dog & Pet

// Example usage
const myDog: DomesticDog = {
  name: 'Rex',
  breed: 'German Shepherd',
  owner: 'John'
}
```

<!-- --- -->

## [TS] Reuse and modify types: Utility Types (Partial, Required, Pick, Omit, Readonly)

Utility types allow you to create new types based on existing ones so that you can reuse or modify them selectively.

- `Partial<T>`: Makes all properties in `T` optional
- `Required<T>`: Makes all properties in `T` required
- `Pick<T, K extends keyof T>`: Picks specific properties from `T`
- `Omit<T, K extends keyof T>`: Excludes specific properties from `T`
- `Readonly<T>`: Makes all properties in `T` readonly

```ts
interface User {
  id: number
  name: string
  email?: string
}

// Make all properties optional
type PartialUser = Partial<User>

// Make all properties required
type RequiredUser = Required<User>

// Pick specific properties
type PickedUser = Pick<User, 'id' | 'name'>

// Exclude certain properties
type OmittedUser = Omit<User, 'email'>

// Make all properties readonly
type ReadonlyUser = Readonly<User>
```

<!-- --- -->

## [TS] How to enforce only certain values: Literal Types, Enum

```ts
// 1. Literal types
type DirectionLiteral = 'up' | 'down' | 'left' | 'right'

function moveLiteral(direction: DirectionLiteral) {
  console.log(`Moving ${direction}`)
}

moveLiteral('up') // You can literally only pass one of the values
// Expected output: 'Moving up'

// - - - - - - - - - -

// 2. Enums
enum DirectionEnum {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

function moveEnum(direction: DirectionEnum) {
  console.log(`Moving ${direction}`)
}

moveEnum(DirectionEnum.Up) // You have to literally pass the enum type
// Expected output: 'Moving UP'

// - - - - - - - - - -

// 3. Errors

// You mix them interchangeably.
// You can't pass a literal to a function that expects an enum, and vice versa.
moveLiteral(DirectionEnum.Up) // Error: Type 'DirectionEnum' is not assignable to type 'DirectionLiteral'.
moveEnum('up') // Error: Type 'string' is not assignable to type 'DirectionEnum'.

// You can't use a value that's not part of the literal type.
moveLiteral('sideways') // Error: Type 'string' is not assignable to type 'DirectionLiteral'.
```

<!-- --- -->

## [TS] How to check or enforce types: Typeof, Instanceof, Keyof, In, As

Checking:
- **typeof**: Check primitive types: `string`, `number`, `boolean`, etc.
- **instanceof**: Check class instances.
- **keyof**: Check object keys.
- **in**: Check property existence.

Enforcing:
- **as**: Assert a type.

```ts
// 1. `typeof`
let value: string | number = 'hello'
if (typeof value === 'string') {
  console.log(value.toUpperCase())
}
// Expected output: 'HELLO'

// - - - - - - - - - -

// 2. `instanceof`
class Animal {}
class Dog extends Animal {}
let pet: Animal = new Dog()
if (pet instanceof Dog) {
  console.log('It's a dog')
}
// Expected output: 'It's a dog'

// - - - - - - - - - -

// 3. `keyof`
interface Person {
  name: string
  age: number
}
type PersonKeys = keyof Person
function getProperty(obj: Person, key: PersonKeys) {
  return obj[key]
}
const person: Person = { name: 'Alice', age: 25 }
console.log(getProperty(person, 'name'))
// Expected output: 'Alice'

// - - - - - - - - - -

// 4. `in`
function hasAge(person: Person): boolean {
  return 'age' in person
}
console.log(hasAge(person))
// Expected output: true

// - - - - - - - - - -

// 5. `as`
let someValue: any = 'this is a string'
let strLength: number = (someValue as string).length
console.log(strLength)
// Expected output: 16
```

<!-- --- -->

## [TS] How to say you don't know or don't care: Unknown, Any

Sometimes you don't know what type of data you're going to get, or you don't care.

`unknown` is still type checked. So it's what you should use whenever you don't know what type of data you're going to get, like when you're getting data from an external API.

`any` skips all type checks, so it's YOLO. It basically defeats the purpose of TypeScript. So use wisely, as a last resort.

```ts
// 1. `unknown` is still type checked
// In this example, we declare `unknownValue` as `unknown`
// If we try to use a method that exists in the number type,
// we have to check or prove that it's a number first,
// otherwise we will get an error.
let unknownValue: unknown = 4

// If we check or prove that `unknownValue` is a number,
// then TypeScript will let us call `toFixed` (or other number methods)
// without an error.
if (typeof unknownValue === 'number') {
  console.log(unknownValue.toFixed(2))
}
// Expected output: '4.00'

// If we don't check or prove that it's a number first, 
// we will get an error.
unknownValue.toFixed(2) // Error: Object is of type 'unknown'.

// - - - - - - - - - -

// 2. `any` works like vanilla JavaScript
// If there's an error or unexpected behavior,
// you'll only find out at runtime, not compile-time
let anyValue: any = 4
anyValue = 'hello' // No error
anyValue = true // No error

console.log(anyValue)
// Expected output: true
```

---

If you'd like to get in touch, [write me an email](mailto:enrique@ruizdurazo.com) or [dm me on X](https://x.com/ruizdurazo).
