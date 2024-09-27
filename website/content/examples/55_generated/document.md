---
aside: false
---

# Document

This example shows how to write whole GraphQL documents in the TypeScript interface.

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon.create()

const pokemons = await pokemon.document({
  //                           ^^^^^^^^
  query: { //                     An operation type.
    pokemonsAndTrainers: { //     A name chosen by you for this operation.
      trainers: { //              A selection on a Query type field (aka. root field, entrypoint).
        name: true, //            A selection on a scalar type field
      },
      pokemons: {
        $: { //                   A field's arguments
          filter: { name: { in: [`Pikachu`, `Charizard`] } },
        },
        name: true,
        trainer: {
          name: true,
        },
      },
    },
  },
  mutation: {
    makeSomeNewPokemons: {
      addPokemon: [
        [`addAngryPikachu`, {
          $: { name: `AngryPikachu`, attack: 100, defense: 100, hp: 100 },
          name: true,
        }],
        [`addAngryCharizard`, {
          $: { name: `AngryCharizard`, attack: 100, defense: 100, hp: 100 },
          name: true,
        }],
      ],
    },
  },
})
  .run(`pokemonsAndTrainers`) //  Set operation name to be executed and send request.

console.log(pokemons)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```json
/some/path/to/handleOutput.ts:XX:XX
    const error = new Errors.ContextualAggregateError(
                  ^


ContextualAggregateError: One or more errors in the execution result.
    at handleOutput (/some/path/to/handleOutput.ts:XX:XX:19)
    at run (/some/path/to/client.ts:XX:XX:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
    at async executeDocument (/some/path/to/client.ts:XX:XX:12)
    at async Object.run (/some/path/to/document.ts:XX:XX:16)
    at async <anonymous> (/some/path/to/generated_document.ts:XX:XX:18) {
  context: {},
  cause: undefined,
  errors: [
    GraphQLError: Field "addPokemon" argument "type" of type "PokemonType!" is required, but it was not provided.
        at <anonymous> (/some/path/to/graphqlHTTP.ts:XX:XX:47)
        at Array.map (<anonymous>)
        at parseExecutionResult (/some/path/to/graphqlHTTP.ts:XX:XX:28)
        at Object.unpack (/some/path/to/core.ts:XX:XX:26)
        at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
        at async runHook (/some/path/to/runHook.ts:XX:XX:16) {
      path: undefined,
      locations: undefined,
      extensions: [Object: null prototype] {}
    },
    GraphQLError: Field "addPokemon" argument "type" of type "PokemonType!" is required, but it was not provided.
        at <anonymous> (/some/path/to/graphqlHTTP.ts:XX:XX:47)
        at Array.map (<anonymous>)
        at parseExecutionResult (/some/path/to/graphqlHTTP.ts:XX:XX:28)
        at Object.unpack (/some/path/to/core.ts:XX:XX:26)
        at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
        at async runHook (/some/path/to/runHook.ts:XX:XX:16) {
      path: undefined,
      locations: undefined,
      extensions: [Object: null prototype] {}
    }
  ]
}

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
