# HTTP Transport

Graffle has the concept of "transports". A transport is how the request reaches the GraphQL schema for execution. This section is about the "http" transport.

<!--@include: @/guides/_example_links/transport-http.md-->

## Overview

The `http` transport implements the ["GraphQL Over HTTP" specification](https://github.com/graphql/graphql-over-http). This transport is used when you instantiate Graffle with a `URL` (or `string`) type for `schema`:

::: code-group

```ts [URL]
Graffle.create({
  schema: new URL('https://api.service.io/graphql'),
})
```

```ts [string]
Graffle.create({
  schema: 'https://api.service.io/graphql',
})
```

:::

## Configuration

You can generally configure aspects of the transport in three ways:

1. In the constructor under `transport`.
2. Using `with` under `transport`.
3. Using extensions.

```ts twoslash
import { Graffle } from 'graffle'
// ---cut---
Graffle.create({
  schema: 'https://...',
  transport: {
    headers: { authorization: '...' },
    raw: { mode: 'cors' },
  },
})
```

## GET

<!--@include: @/guides/_example_links/method-get.md-->

By default all requests use HTTP POST. However you can configure queries and subscriptions to be sent over HTTP GET.

```ts twoslash
import { Graffle } from 'graffle'
// ---cut---
graffle.create({
  schema: 'https://...',
  transport: { methodMode: 'getReads' },
})
```

## POST

## Raw

## Anyware

Hooks are augmented in the following ways:

|           | Encode | Pack                   | Exchange  | Unpack     | Decode     |
| --------- | ------ | ---------------------- | --------- | ---------- | ---------- |
| Input     | -      | `url` `headers` `body` | `request` | `response` | `response` |
| Functions | -      | -                      | `fetch`   |            |            |
