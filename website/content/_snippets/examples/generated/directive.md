<div class="ExampleSnippet">
<a href="../../examples/generated/directive">Directive</a>

<!-- dprint-ignore-start -->
```ts twoslash
// import { parse, print } from 'graphql'
// ---cut---
import { Pokemon } from './pokemon/__.js'

const pokemon = Pokemon.create()
// .anyware(({ pack }) => {
//   console.log(print(parse(pack.input.query)))
//   return pack()
// })

const pokemons = await pokemon.query.$batch({
  ___: {
    // $defer: true,
    pokemons: {
      name: true,
    },
  },
  trainers: {
    // $stream: {
    //   if: true,
    //   initialCount: 0,
    //   label: `trainers`,
    // },
    name: true,
    id: {
      $skip: true,
    },
    pokemon: {
      id: {
        $include: false,
      },
      name: true,
    },
  },
})

console.log(pokemons)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```json
{
  "trainers": [
    {
      "name": "Ash",
      "pokemon": [
        {
          "name": "Pikachu"
        },
        {
          "name": "Charizard"
        }
      ]
    },
    {
      "name": "Misty",
      "pokemon": [
        {
          "name": "Squirtle"
        }
      ]
    }
  ],
  "pokemons": [
    {
      "name": "Pikachu"
    },
    {
      "name": "Charizard"
    },
    {
      "name": "Squirtle"
    },
    {
      "name": "Bulbasaur"
    }
  ]
}
```
<!-- dprint-ignore-end -->

</div>
