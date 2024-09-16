# Output

<!--@include: @/_snippets/example-links/output.md-->

This guide is about Graffle's ability to return various types from its request methods depending on the mode you've chosen to run it with.

## Overview

The typical GraphQL execution result type you see in the JavaScript ecosystem comes from the `graphql` package:

```ts twoslash
import { ExecutionResult } from 'graphql'
```

Graffle can return a type compatible with that, but also others if you so wish. For example:

1. Return the data directly without an envelope.
1. Return (instead of throwing) errors in addition to the successful result (thus return type becomes a union).
1. Return an envelope _and_ place some or all kinds of errors into the `errors` field whilst having other kinds of errors either be thrown or returned.
1. Throw all or some kinds of errors.

This flexibility allows Graffle to integrate more easily into different kinds of code standards and contexts. For example some developers choose to treat errors as data explicitly tracked in the type system thus never throwing, but then in a project script or test, such safety may be counter-productive and so the approach of always throwing taken.

## Configuration

You can configure output through the `output` configuration property.

```ts twoslash
import { Graffle } from 'graffle'
// ---cut---
const graffle = Graffle.create({
  schema: '...',
  output: {
    errors: {
      execution: 'throw',
      other: 'return',
    },
  },
})
```

## Envelope

You can choose to use an envelope. When you use an envelope the data will be returned nested in a `data` property adjacent to other metadata properties within the envelop. You can choose to put kinds of errors into the envelope as well.

```ts twoslash
import { Graffle } from 'graffle'
// ---cut---
const graffle = Graffle.create({
  schema: '...',
  output: {
    errors: {
      execution: 'throw',
      other: 'return',
    },
  },
})
```

1. `errors` – errors that you have chosen to include in the envelope.
2. `extensions` – GraphQL execution result extensions.
3. `response` – Only present if [transport](#link-todo) is `http`. The HTTP response to the request that was sent for the given GraphQL document.

## Errors

There are three categories of errors:

1. `execution` – Anything that went wrong during execution. Examples: invalid input given, resolver threw an error.
2. `schema` – Only present if the [schema errors](#schema-errors) are being used. Any time a result field returns an error type.
3. `other` – Anything else. Examples: network error during request, extension threw error, your anyware threw an error.

You can choose to output error categories in the following ways:

1. `throw` – Errors from category will be thrown. There is no type safety with this approach.
2. `return` – Errors from category will be returned. The return type will thus become a union type.
3. `default` – Use whatever the default is (you can change the default).
