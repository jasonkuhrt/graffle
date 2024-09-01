---
aside: false
---

# Transport Memory

```ts twoslash
import { Graffle } from 'graffle'
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'

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

#### Output

```json
{
  "data": {
    "foo": "bar"
  }
}
```
