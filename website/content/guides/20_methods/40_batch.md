# Batch <GeneratedClientBadge />

<!-- @include: @/_snippets/example-links/batch.md -->

The `$batch` method appears on the client interface for every root type in the GraphQL schema. It is useful when you need to select multiple root fields in a single request.

> [!Note]
> This is not the same thing as [request batching](https://the-guild.dev/graphql/yoga-server/docs/features/request-batching).
> That is a feature [Graffle does not yet support](https://github.com/jasonkuhrt/graffle/issues/1017).

For example the [pokemon schema](../../examples/01_about/pokemon-schema.md) has these two root fields:

```graphql
type Mutation {
  addPokemon(attack: Int, defense: Int, hp: Int, name: String!, type: PokemonType!): Pokemon
	# ...
}
```

And you could select both with `$batch` in a single request:

```ts twoslash
import { Pokemon } from './pokemon/__.js'
const pokemon = Pokemon.create()
// ---cut---
const result = await pokemon.query.$batch({
  //                               ^^^^^^
  pokemons: {
    name: true,
  },
  trainers: {
    name: true,
  },
})
```

### Example

<!-- @include: @/_snippets/examples/generated/batch.md -->
