# Root Fields <GeneratedClientBadge />

<!-- @include: @/_snippets/example-links/root-field.md -->

Every root field (aka. entrypoint) in the GraphQL schema is made available as a method on the generated client. Root fields are any field on the root types: `Query`, `Mutation`, and `Subscription`.

For example the [pokemon schema](../../examples/01_about/pokemon-schema.md) has this root field:

```graphql
type Mutation {
  addPokemon(attack: Int, defense: Int, hp: Int, name: String!, type: PokemonType!): Pokemon
	# ...
}
```

Then the generated client would include a `addPokemon` method.

```ts twoslash
import { Pokemon } from './pokemon/__.js'
const pokemon = Pokemon.create()
// ---cut---
const result = await pokemon.mutation.addPokemon({
  //                         ^^^^^^^^^^^^^^^^^^^
  $: {
    name: 'Charmander',
    type: 'fire',
  },
  name: true,
})
```

### Example

<!-- @include: @/_snippets/examples/generated/root-field.md -->
