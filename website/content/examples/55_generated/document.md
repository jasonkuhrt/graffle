---
aside: false
---

# Document

This example shows how to use the TypeScript interface for whole GraphQL documents.

<!-- dprint-ignore-start -->
```ts twoslash
// ---cut---
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon.create()

const pokemons = await pokemon.document({
  query: { //                     A root type.
    pokemonsAndTrainers: { //     A name of an the operation.
      trainers: { //              A root field.
        name: true, //            A field.
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
        ['addAngryPikachu', {
          $: { name: `AngryPikachu`, attack: 100, defense: 100, hp: 100 },
          name: true,
        }],
        ['addAngryCharizard', {
          $: { name: `AngryCharizard`, attack: 100, defense: 100, hp: 100 },
          name: true,
        }],
      ],
    },
  },
})
  .run('makeSomeNewPokemons')

console.log(pokemons)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```json
/some/path/to/runPipeline.ts:XX:XX
          return new ContextualError(message, { hookName: signal.hookName, source: signal.source }, signal.error)
                 ^


ContextualError: There was an error in the core implementation of hook "decode".
    at runPipeline (/some/path/to/runPipeline.ts:XX:XX:18)
    at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
    at async runPipeline (/some/path/to/runPipeline.ts:XX:XX:14)
    at async runPipeline (/some/path/to/runPipeline.ts:XX:XX:14)
    at async runPipeline (/some/path/to/runPipeline.ts:XX:XX:14)
    at async runPipeline (/some/path/to/runPipeline.ts:XX:XX:14)
    at async Object.run (/some/path/to/main.ts:XX:XX:22)
    at async run (/some/path/to/client.ts:XX:XX:20)
    at async executeRootType (/some/path/to/client.ts:XX:XX:12)
    at async Object.run (/some/path/to/client.ts:XX:XX:20) {
  context: { hookName: 'decode', source: 'implementation' },
  cause: Error: Field not found: addAngryPikachu
      at <anonymous> (/some/path/to/customScalars.ts:XX:XX:28)
      at <anonymous> (/some/path/to/prelude.ts:XX:XX:20)
      at Array.map (<anonymous>)
      at mapValues (/some/path/to/prelude.ts:XX:XX:28)
      at Module.decode (/some/path/to/customScalars.ts:XX:XX:10)
      at Object.decode (/some/path/to/core.ts:XX:XX:45)
      at runHook (/some/path/to/runHook.ts:XX:XX:37)
      at runPipeline (/some/path/to/runPipeline.ts:XX:XX:8)
      at runPipeline (/some/path/to/runPipeline.ts:XX:XX:20)
      at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
}

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->
