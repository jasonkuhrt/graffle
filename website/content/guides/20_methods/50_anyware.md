---
outline: [2,5]
---

# Anyware

<!--@include: @/_snippets/example-links/anyware.md-->

## Introduction

Graffle allows you to apply one or more anyware's to the request pipeline. Each anyware runs on every request.

You can think of anyware like middleware (run code before and after some operation with control to manipulate input and output) except that it represents a _sequence_ of operations that form a pipeline rather than just one operation like traditional middleware.

The request pipeline has five hooks: [`encode`](#encode), [`pack`](#pack), [`exchange`](#exchange), [`unpack`](#unpack), and [`decode`](#decode). You will learn more about these later.

A hook receives input and returns output. Output becomes input for the next hook except the final hook's output which becomes the pipeline result.

Here is a snippet with a few highlights to give you a feel for how it works (note it does not always have to be this verbose as you will see later):

```ts twoslash
import { Graffle } from 'graffle'
// ---cut---
Graffle
  .create({ schema: '...' })
  .anyware(async ({ encode }) => {
    const { pack } = await encode() // [1]

    const { exchange } = await pack({
      input: { ...pack.input /* ... */ }, // [2]
    })

    const { unpack } = await exchange({
      using: { fetch: async () => new Response() }, // [3]
    })

    return unpack() // [4]

    // const { decode } = await unpack()

    // const result = await decode()

    // return result
  })
```

1. We run `encode` without passing any input to it. It runs using its original input.
2. We run `pack` with some custom input. We just want to modify the input slightly so access the original input under the `input` property on the hook function to spread in.
3. This is leveraging a feature called ["slots"](#slots). We run `exchange` with its original input but modified implementation for `fetch`.
4. This is leveraging a feature called ["short-circuiting"](#short-circuiting). We _could_ have run the rest of the hooks manually but if we don't have to. By returning the hook result we're conceptually turning any remaining hooks into automatic passthroughs.

## Layers

There are two layers that make up the graffle request pipeline: `interface`, `transport`. Hooks are exposed at key junctures in the pipeline. The following diagram shows how hooks and layers relate.

<img class='Diagram DiagramGraffleRequest' src="/_assets/graffle-request.svg" />

Each layer has a specific responsibility:

1. `interface` – Bridge some type of interface to/from the standard GraphQL request/result object.
2. `transport` – Bridge the standard GraphQL request/result object to/from some type of transport's request/response object, and execute the "exchange". As a term "Exchange" is akin to "request" but tries to convey a decoupling from any particular transport like HTTP.

## Data

The type of data flowing through the request pipeline is polymorphic reflecting the different types of each layer kind.

| Layer Kind  | Types           |
| ----------- | --------------- |
| `interface` | `typed` `raw`   |
| `transport` | `http` `memory` |

Discriminated unions are used to model this. All hook inputs share a base interface type which carries the discriminated properties of `interface` and `transport`. You can use these properties to narrow data in your anyware as needed.

```ts twoslash
import { Graffle } from 'graffle'
// ---cut---
Graffle
  .create({ schema: 'https://...' })
  .anyware(async ({ encode }) => {
    if (encode.input.interface === 'typed') {
      // Do something here.
    }

    // etc.

    return encode()
  })
```

> [!Note] DX ❤️
> You will find lots of little ways we try to maximize the DX of anyware. For example if you create your client with a schema URL then transport is typed `http` but if you create it with a schema instance then `memory`. This reduces the narrowing logic you need in your anyware.

## Hooks

This section covers each hook in detail, ordered by their sequence in the request pipeline.

### Encode

<p class="TitleHint">Layer: Interface</p>

| When interface ... | Then ...                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `typed`            | Given some input, create a GraphQL request. <br> 2. Encode any custom scalar arguments.                    |
| `raw`              | Passthrough. The raw interface accepts GraphQL requests directly. Custom scalar arguments are not encoded. |

### Pack

<p class="TitleHint">Layer: Transport</p>

| When transport ... | Then ...                                                             |
| ------------------ | -------------------------------------------------------------------- |
| `http`             | Given a GraphQL Request, create an HTTP request object.              |
| `memory`           | Passthrough. The memory transport accepts GraphQL requests directly. |

#### Slot `searchParams`

| When transport ... | And ...                                                    | Then ...                           |
| ------------------ | ---------------------------------------------------------- | ---------------------------------- |
| `http`             | Exchange will use [HTTP GET](/guides/transports/http#get). | Create the HTTP Search Parameters. |
| `memory`           | -                                                          | -                                  |

#### Slot `body`

| When transport ... | And ...                                                      | Then ...              |
| ------------------ | ------------------------------------------------------------ | --------------------- |
| `http`             | Exchange will use [HTTP POST](/guides/transports/http#post). | Create the HTTP body. |
| `memory`           | -                                                            | -                     |

### Exchange

<p class="TitleHint">Layer: Transport</p>

| When transport ... | Then ...                                                           |
| ------------------ | ------------------------------------------------------------------ |
| `http`             | Send request using `fetch`.                                        |
| `memory`           | Send request using `execute`/`graphql` from the `graphql` package. |

#### Slot `fetch`

| When transport ... | Then ...                    |
| ------------------ | --------------------------- |
| `http`             | Send request using `fetch`. |
| `memory`           | -                           |

### Unpack

<p class="TitleHint">Layer: Transport</p>

| When transport ... | Then ...                                                   |
| ------------------ | ---------------------------------------------------------- |
| `http`             | Given an HTTP response object, create a GraphQL result.    |
| `memory`           | Passthrough. The exchange returns GraphQL results already. |

### Decode

<p class="TitleHint">Layer: Interface</p>

| When interface ... | Then ...                                      |
| ------------------ | --------------------------------------------- |
| `typed`            | Decode any custom scalars in the result data. |
| `raw`              | Passthrough. Custom scalars are not decoded.  |

## Jump-Starting

<!--@include: @/_snippets/example-links/jump-start.md-->

If you want to jump straight to a specific hook other than `encode` you can do so by simply destructing to the desired hook. For example here we write anyware for `exchange`:

```ts twoslash
import { Graffle } from 'graffle'
// ---cut---
Graffle
  .create({ schema: '...' })
  .anyware(async ({ exchange }) => {
    // ... do something ...
    const { unpack } = await exchange()
    // ... do something ...
    const { decode } = await unpack()
    // ... do something ...
    const result = await decode()
    // ... do something ...
    return result
  })
```

Note that you will hit a runtime error if you try to destructure more than one hook.

## Short-Circuiting

<!--@include: @/_snippets/example-links/short-circuit.md-->

If you want to end your work before `decode` you can do so by returning any hook result. This will cause the reset of the hooks to become passthroughs. For example:

```ts twoslash
import { Graffle } from 'graffle'
// ---cut---
Graffle
  .create({ schema: '...' })
  .anyware(async ({ encode }) => {
    // ... do something ...
    const { pack } = await encode()
    // ... do something ...
    const { exchange } = await pack()
    // ... do something ...
    return await exchange()
  })
```

## Input

You can override the input to any hook by passing your own input:

```ts
Graffle
  .create({ schema: '...' })
  .anyware(async ({ encode }) => {
    return encode({
      input: {/* ... */},
    })
  })
```

You can access the original input of any hook from its `input` property. This is often useful for spreading into a hook so that you only have to pass the input you want to modify.

```ts twoslash
import { Graffle } from 'graffle'
// ---cut---
Graffle
  .create({ schema: '...' })
  .anyware(async ({ encode }) => {
    return encode({
      input: { ...encode.input /* ... */ },
    })
  })
```

## Slots

<!--@include: @/_snippets/example-links/slot.md-->

Hooks can have one or more slots that allow you to override a part of their implementation.

When two anywares are used that both customize the same slot then its the later anyware whose customization is used.

## Multiple Anywares

You can use as many anywares as you want. Typically you'll only have one explicit one with others coming from extensions you've added.

They execute in the order they were added, regardless of if it was added via an extension or directly. So for example in the following example the direct anyware would run after the first used extension but before the second.

```ts
Graffle
  .create({ schema: '...' })
  .use(Extension1WithAnyware())
  .anyware(async ({ encode }) => {/* ... */})
  .use(Extension2WithAnyware())
```

When running there are two stacks that are interleaved as described below:

1. Anyware stack
2. Hook stack

When an anyware runs a hook it actually passes control to the next anyware in the stack to run it but using input coming from that previous anyware. This process repeats until there are no more anywares in the stack at which point the hook is run with the finally produced input and a return value is produced. That value is sent back to the first anyware to continue execution and repeating this cycle for the next hook. Eventually all hooks are run and the final result is returned.

You can access the original input of any hook from its `input` property. This is often useful for spreading into a hook so that you only have to pass the input you want to modify.
