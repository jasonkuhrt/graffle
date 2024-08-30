# HTTP Transport

Graffle has the concept of "transports". A transport is how the request reaches the GraphQL schema for execution. This section is about the "http" transport.

<!--@include: @/guides/_example_links/transport_http.md-->

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

## Headers

<!--@include: @guides/_example_links/transport_http_headers.md-->

When using this transport, you may also input [`HeadersInit`](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers#init) into [`$with`](/todo).

```ts
graffle.$with({ headers: { authorization: '...' } })
```
