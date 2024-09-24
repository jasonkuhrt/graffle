---
title: Generated <GeneratedClientBadge />
---

# Getting Started <GeneratedClientBadge />

The following takes you through a simple example to demonstrate how generation works and what it gives you.

## Install Package

If you don't already have a project, create one:

```sh
pnpm init
```

Install dependencies. Graffle has a peer dependency on `graphql` so you will need to install that too. To easily run TypeScript we'll install `tsx`.

```sh
pnpm add graffle graphql tsx
```

## Generate Client

Now you have access to the `graffle` command line interface in your project. Use it to generate a client. We will use a simple publicly available GraphQL API for our schema source.

```sh
pnpm graffle --schema https://countries.trevorblades.com/graphql
```

You will see a directory named `graffle` has been created in the current working directory. You will import Graffle from here now instead of the static library `graffle`. Note that you still need `graffle` installed as the generated code is just a thin layer of code that still imports from `graffle`.

```
|
|- graffle/
|  |- ...
|
```

> [!note] Schema Sources
> You can use any GraphQL API that has introspection enabled. Alternatively you can also give a file path to a [GraphQL SDL file](https://todo).

## Instantiate Client

Create a module (e.g. `main.ts`), import the constructor, and create an instance.

```ts twoslash
import { Graffle } from './graffle/__.js'

const graffle = Graffle.create() // [1]
```

Note:

1. The constructor's `schema` parameter that tells the client _where_ to send requests to is optional because the CLI used a URL to introspect the schema at generation time and thus defaults the generated client to use that same URL.

## Starting Raw

Now you're ready to send a request (run e.g. `pnpm tsx main.ts`). Before getting to the generated part though, we'll confirm that the base static client works just as it did without generation:

```ts twoslash
import { Graffle } from './graffle/__.js'
const graffle = Graffle.create()
// ---cut---
const data = await graffle.rawString({
  document: `query { continents { name } }`,
})
console.log(data)
```

<!-- dprint-ignore -->
 ```js
 {
   continents: [
     { name: 'Africa' },
     { name: 'Antarctica' },
     { name: 'Asia' },
     { name: 'Europe' },
     { name: 'North America' },
     { name: 'Oceania' },
     { name: 'South America' },
   ]
 }
 ```

Great! This is a core principal of Graffle: Generation is _addidative_. You don't need to unlearn anything from the static client.

## Generated Document Method

Now let's try the generated TypeScript interface that reflects our schema. We'll rewrite our query:

```ts twoslash
import { Graffle } from './graffle/__.js'
const graffle = Graffle.create()
// ---cut---
const data /* [2] */ = await graffle
  .document({ // [1]
    query: { // Operation
      demoQuery: { // Operation name
        continents: { // Query field selection
          name: true, // Continent field selection
        },
      },
    },
  })
  .run()
```

Note:

1. The input is type safe.
2. The results are type safe.

## Generated Query Field Method

The `.document` method we just used allows sending whole GraphQL documents but we can use a more direct interface if we just want `continents` data:

```ts twoslash
import { Graffle } from './graffle/__.js'
const graffle = Graffle.create()
// ---cut---
const continents = await graffle.query.continents({ name: true })
console.log(continents)
```

<!-- dprint-ignore -->
 ```js
 [
   { name: 'Africa' },
   { name: 'Antarctica' },
   { name: 'Asia' },
   { name: 'Europe' },
   { name: 'North America' },
   { name: 'Oceania' },
   { name: 'South America' },
 ]
 ```

Simple! Notice that the default output changes here to the `result.data.continents`. In the [Output guide](./output.md) you'll learn how to change this behavior if desired.

## Arguments

Like the rest of GraphQL's features, arguments are modelled into the TypeScript interface. Here's an example of that. Notice the special `$` property. It is an invalid GraphQL field name so Graffle knows it can be safely used for arguments regardless of the design of the schema. Here we reduce the set of all countries to just three.

```ts twoslash
import { Graffle } from './graffle/__.js'
const graffle = Graffle.create()
// ---cut---
const countries = await graffle.query.countries({
  $: { filter: { name: { in: [`Canada`, `Germany`, `Japan`] } } },
  name: true,
  continent: {
    name: true,
  },
})

console.log(countries)
//          ^?
```

```json
[
  { "name": "Canada", "continent": { "name": "North America" } },
  { "name": "Germany", "continent": { "name": "Europe" } },
  { "name": "Japan", "continent": { "name": "Asia" } }
]
```

## Utilities

Its worth knowing Graffle also gives you utilities beyond the direct client itself. For example you can build up reusable selection sets:

::: code-group

```ts twoslash [Graffle Namespace]
import { Graffle } from './graffle/__.js'

const ContinentSelection = Graffle.Select.Continent({ name: true })
```

```ts twoslash [Barrel Import]
import { Select } from './graffle/_.js'

const ContinentSelection = Select.Continent({ name: true })
```

:::

You can also do the same thing at the type level which can sometimes be handy when you want to define data types based on selection sets.

::: code-group

```ts twoslash [Graffle Namespace]
import { type Graffle } from './graffle/__.js'

type Continent = Graffle.Select.Continent<{ name: true }>
```

```ts twoslash [Barrel Import]
import { type Select } from './graffle/_.js'

type Continent = Select.Continent<{ name: true }>
```

:::

## Conclusion

There is more to learn (e.g. how directives, unions, interfaces, custom scalars, ... are modelled into the TypeScript interface) but hopefully this has already given you some confidence to go off and start building. Of course feel free to continue digging deeper into more specific feature guides too. Thanks for taking time to learn Graffle and we're excited to see what you'll build!
