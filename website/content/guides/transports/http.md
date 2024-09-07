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

Precedence is:

1. The extension stack, later extensions taking precedence
2. `with` configuration
3. Constructor configuration

Within each of the above the `raw` configuration takes precedence over other properties directly under `transport`.

Note:

- Headers are merged.
- If a header is given an empty string value, then it deletes that header value if previously set.
- Because `transport.raw` has zero guard rails you should know what you're doing when using it. For example if you set `raw.method` to `PATCH` that would override the `methodMode` configuration and lead to a generally invalid GraphQL request over HTTP.

## GET

<!--@include: @/guides/_example_links/method-get.md-->

By default all requests use HTTP POST. However you can configure queries and subscriptions to be sent over HTTP GET.

```ts twoslash
import { Graffle } from 'graffle'
// ---cut---
Graffle.create({
  schema: 'https://...',
  transport: { methodMode: 'getReads' },
  //                       ^^^^^^^^^^
})
```

## POST

By default all requests use HTTP POST. If you need to explicitly re-configure this you can.

```ts twoslash
import { Graffle } from 'graffle'
// ---cut---
Graffle.create({
  schema: 'https://...',
  transport: { methodMode: 'post' }, // The default.
  //                       ^^^^^^
})
```

## Anyware

Hooks are augmented in the following ways:

|           | Encode | Pack                   | Exchange  | Unpack     | Decode     |
| --------- | ------ | ---------------------- | --------- | ---------- | ---------- |
| Input     | -      | `url` `headers` `body` | `request` | `response` | `response` |
| Functions | -      | -                      | `fetch`   |            |            |

## Raw

- You can easily pass configuration to `fetch` via `transport.raw`.
- It takes precedence over other `transport.*` properties.
- Because `transport.raw` has zero guard rails you should know what you're doing when using it. For example if you set `raw.method` to `PATCH` that would override the `methodMode` configuration and lead to a generally invalid GraphQL request over HTTP.

```ts twoslash
import { Graffle } from 'graffle'
// ---cut---
Graffle.create({
  schema: 'https://...',
  transport: { raw: { mode: 'cors' } },
  //           ^^^
})
```
