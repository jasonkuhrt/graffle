---
aside: false
---

# Interface

This example shows how to work with interface types.

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon.create()

const beings = await pokemon.query.beings({
  __typename: true,
  id: true,
  name: true,
  ___on_Patron: {
//^^^^^^^^^^^^
    money: true,
  },
  ___on_Trainer: {
//^^^^^^^^^^^^^
    class: true,
  },
  ___on_Pokemon: {
//^^^^^^^^^^^^^
    type: true,
  },
})

// The following contrived switch console.logs how the returned type is a discriminated union.
// After checking the __typename, the type is known to be one of the three possible types
// and TypeScript narrows accordingly.

for (const being of beings) {
  console.log(being.name)
  switch (being.__typename) {
    case `Patron`:
      console.log(being.money)
      break
    case `Trainer`:
      console.log(being.class)
      break
    case `Pokemon`:
      console.log(being.type)
      break
  }
}
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
/some/path/to/handleOutput.ts:XX:XX
    const error = new Errors.ContextualAggregateError(
                  ^


ContextualAggregateError: One or more errors in the execution result.
    at handleOutput (/some/path/to/handleOutput.ts:XX:XX:19)
    at run (/some/path/to/client.ts:XX:XX:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
    at async executeDocument (/some/path/to/client.ts:XX:XX:12)
    at async executeRootTypeField (/some/path/to/client.ts:XX:XX:20)
    at async <anonymous> (/some/path/to/generated_interface.ts:XX:XX:16) {
  context: {},
  cause: undefined,
  errors: [
    GraphQLError: Abstract type "Being" was resolved to a type "pokemon" that does not exist inside the schema.
        at <anonymous> (/some/path/to/graphqlHTTP.ts:XX:XX:47)
        at Array.map (<anonymous>)
        at parseExecutionResult (/some/path/to/graphqlHTTP.ts:XX:XX:28)
        at Object.unpack (/some/path/to/core.ts:XX:XX:26)
        at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
        at async runHook (/some/path/to/runHook.ts:XX:XX:16) {
      path: [ 'beings', 8 ],
      locations: undefined,
      extensions: [Object: null prototype] {}
    }
  ]
}

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
