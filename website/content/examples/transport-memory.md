---
aside: false
---

# Transport Memory

```ts twoslash
/**
 * tags: transport-memory
 */

import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { Graffle } from 'graphql-request/graffle/main'

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
