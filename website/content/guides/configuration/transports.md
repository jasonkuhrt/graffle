# Transports

Graffle has the concept of "transports". A transport is how the document reaches the GraphQL schema for execution. There are two transports.

## `http`

The `http` transport implements the ["GraphQL Over HTTP" specification](https://github.com/graphql/graphql-over-http). This transport is used when you instantiate Graffle with a URL (or string) type for the schema:

::: code-group

```ts [URL]
const graffle = Graffle.create({
  schema: new URL('https://api.service.io/graphql'),
})
```

```ts [string]
const graffle = Graffle.create({
  schema: 'https://api.service.io/graphql',
})
```

:::

### Headers

When using this transport, you may also input [`HeadersInit`](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers#init) into [`$with`](/todo).

```ts
const graffle = Graffle
  .create({ schema: new URL('https://api.service.io/graphql') })
  .$with({
    headers: {
      authorization: '...',
      // ...
    },
  })
```

## `memory`

The `memory` transport works with in-memory schemas. It ultimately invokes [`execute`](https://graphql.org/graphql-js/execution/) from the `graphql` package. This transport is used when you instantiate Graffle with a [`GraphQLSchema`](https://graphql.org/graphql-js/type/#schema).

```ts
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
