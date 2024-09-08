# Generation

## Overview

Graffle allows you to extend your client with generated code. This is achieved through a generator CLI that Graffle ships with. Using the CLI, you pass it either a file path to a GraphQL SDL file or a URL to a GraphQL API supporting introspection, and then the CLI outputs TypeScript modules into a local directory that can be used by your project. The benefits of generation are:

1. A TypeScript first interface for sending requests to the GraphQL schema.
2. Type-safe request inputs (selection set, directives, etc.).
3. Type-safe request outputs (results) inferred from the the request input.
4. Automatic encoding and decoding of custom scalars.
5. Type utilities to create TypeScript types based on types in the GraphQL schema.
6. Runtime utilities to create reusable selection sets.

## Example

The following takes you through a simple example to demonstrate how generation works and what it gives you.

1. `pnpm init`
1. `pnpm add graffle`
1. `pnpm graffle --schema https://countries.trevorblades.com/graphql`
1. A local directory will have been generated `./graffle`. You will import Graffle from here now instead of the static library `graffle`. Note that you still need `graffle` installed as the generated code is just a thin layer of code that still imports from `graffle`.
1. You can start sending requests. The constructor's schema parameter is made optional because the CLI used the URL to introspect the schema so it already knows where to send requests to.

   ```ts twoslash
   import { Graffle } from './graffle/__.js'

   const graffle = Graffle.create()
   const result = await graffle.rawString({
     document: `query { continents { name } }`,
   })
   console.log(result.data)
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
1. So far this is not much different than using the static Graffle client. Let's try the TypeScript interface that is exclusive to the generated client. We'll rewrite our query:

   ```ts twoslash
   import { Graffle } from './graffle/__.js'

   const graffle = Graffle.create()
   // ---cut---
   const data = await graffle
     .document({
       demoQuery: { // Operation name
         query: { // Operation
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

1. The `.document` method allows sending whole GraphQL documents but we can use more targeted interface if we just want `continents` like so:
   ```ts twoslash
   import { Graffle } from './graffle/__.js'

   const graffle = Graffle.create()
   // ---cut---
   const data = await graffle.query.continents({ name: true })
   ```
   Simple!

1. There are many more features covered by the rest of these guides. One more thing we'll demonstrate here are the utilities. You can build up reusable selection sets if desired:

   ```ts twoslash
   import { Select } from './graffle/modules/Select.js'

   const ContinentSelection = Select.Continent({ name: true })
   ```

1. You can also do the same thing at the type level:

   ```ts twoslash
   import { type Select } from './graffle/modules/Select.js'

   type Continent = Select.Continent<{ name: true }>
   ```

## CLI

Typically you will use the CLI to generate a client. After installing `graffle` you will have access to a CLI also named `graffle`.

```bash
pnpm add graffle
pnpm graffle --schema '...'
```

The CLI has built in help that you can use to learn about all its inputs.

```bash
pnpm graffle --help
```

## API

If you need to script graffle client generation then you can drop to the underlying Graffle generator API. It is largely one-to-one with the CLI. Use its JSDoc to learn about all its inputs.

```ts
import { generate } from 'graffle/generator'
```
