---
aside: false
---

# Memory Transport

Graffle has the concept of "transports". A transport is how the request reaches the GraphQL schema for execution. This section is about the "memory" transport.

<!--@include: @/_snippets/example-links/transport-memory.md-->

## Overview

The `memory` transport works with in-memory schemas. It ultimately invokes [`execute`](https://graphql.org/graphql-js/execution/) from the `graphql` package. This transport is used when you instantiate Graffle with a [`GraphQLSchema`](https://graphql.org/graphql-js/type/#schema).

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
```
