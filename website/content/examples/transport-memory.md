---
aside: false
---

# Transport Memory

<!-- dprint-ignore-start -->
```ts twoslash
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { Graffle } from 'graffle'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: `Query`,
    fields: {
      foo: {
        type: GraphQLString,
        resolve: () => `bar`,
      },
    },
  }),
})

const graffle = Graffle.create({ schema })

const result = await graffle.rawString({ document: `{ foo }` })

console.log(result)
//          ^?
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```json
{
  "data": {
    "foo": "bar"
  }
}
```
<!-- dprint-ignore-end -->
