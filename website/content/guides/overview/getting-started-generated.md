# Getting Started <Badge text="generated client" />

## Install Package

Graffle has a peer dependency on `graphql` so you will need to install that too.

```sh
pnpm add graffle graphql
```

## Generate Client Lib

Now you have access to the `graffle` command line interface in your project. Use it to generate a client. We will use a simple publicly available GraphQL API for our schema source.

```sh
pnpm graffle --schema https://countries.trevorblades.com/graphql
```

You will see a directory named `graffle` has been created in the current working directory.

```
|
|- graffle/
|  |- ...
|
```

> [!note] Schema Sources
> You can use any GraphQL API that has introspection enabled. Alternatively you can also give a file path to a [GraphQL SDL file](https://todo).

## Create Client

Create a module, import the constructor, and create an instance. As you can see it is extremely minimal. Graffle even defaults the schema URL to what we used during gentime so we can omit it here.

```ts twoslash
import './graffle/Global.js'
// ---cut---
import { Graffle } from './graffle/__.js'

const graffle = Graffle.create()
```

## Send Document

Now you're ready to send a "document". Your generated client gives you a rich interface reflecting the shape of the schema. Not only does this give you type safety it simplifies the result type (but if you want that envelope back for any reason don't worry, its [just a config away](./todo)).

```ts twoslash
import './graffle/Global.js'
import { Graffle } from './graffle/__.js'
const graffle = Graffle.create({ schema: 'abc' })
// ---cut---
const countries = await graffle.query.countries({
  $: {
    filter: {
      name: { in: [`Canada`, `Germany`, `Japan`] },
    },
  },
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
