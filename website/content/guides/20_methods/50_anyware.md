---
outline: [2,5]
---

# Anyware

<!--@include: @/_snippets/example-links/anyware.md-->

## Introduction

Graffle allows you to apply one or more anyware's to the request pipeline. Each anyware runs on every request.

You can think of anyware like middleware (run code before and after some operation with control to manipulate input and output) except that it represents a _sequence_ of operations that form a pipeline rather than just one operation like traditional middleware.

The request pipeline has five hooks: [`encode`](#encode), [`pack`](#pack), [`exchange`](#exchange), [`unpack`](#unpack), and [`decode`](#decode).

Each hook receives an input and returns an output. Each hook's output is the input to the next hook, until the last hook which returns the final result.

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

## Data

Recall that Graffle supports multiple interfaces and transports:

| Interface | Transport |
| --------- | --------- |
| `typed`   | `http`    |
| `raw`     | `memory`  |

Discriminated unions are used to model this in the input/output types flowing through the pipeline. While each hook's input is unique to itself there is a base type that all inputs share which carries the discriminated properties, `interface` and `transport`. You can use these properties to narrow the type as needed.

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

If Graffle is created with a URL for schema then it will automatically type `transport` as `http`. Conversely if you pass a GraphQL schema instance it will automatically type `transport` as `memory`.

## Hooks

### Encode

| When Interface | Then Performs Tasks                                                                       |
| -------------- | ----------------------------------------------------------------------------------------- |
| `typed`        | 1. Transform input into its GraphQL representation. <br> 2. Encode custom scalars if any. |
| `raw`          | Passthrough                                                                               |

### Pack

| When Transport | Then Performs Tasks    |
| -------------- | ---------------------- |
| `http`         | Construct a `Request`. |
| `memory`       | Passthrough            |

#### Slot `searchParams`

| When Transport | Then Performs Tasks                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `http`         | When request will be sent [using GET](/guides/transports/http#get) this slot is called to create the value that will be used for the HTTP Search Parameters. |
| `memory`       | N/A                                                                                                                                                          |

#### Slot `body`

| When Transport | Then Performs Tasks                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `http`         | When request will be sent [using POST](/guides/transports/http#post) this slot is called to create the value that will be used for the HTTP body. |
| `memory`       | N/A                                                                                                                                               |

### Exchange

| When Transport | Then Performs Tasks                                                |
| -------------- | ------------------------------------------------------------------ |
| `http`         | Send request using `fetch`.                                        |
| `memory`       | Send request using `execute`/`graphql` from the `graphql` package. |

#### Slot `fetch`

| When Transport | Then Performs Tasks         |
| -------------- | --------------------------- |
| `http`         | Send request using `fetch`. |
| `memory`       | N/A                         |

### Unpack

| When Transport | Then Performs Tasks                       |
| -------------- | ----------------------------------------- |
| `http`         | Transform `Response` into GraphQL result. |
| `memory`       | Passthrough                               |

### Decode

| When Interface | Then Performs Tasks           |
| -------------- | ----------------------------- |
| `typed`        | Decode custom scalars if any. |
| `raw`          | Passthrough                   |

## Jump-Starting

<!--@include: @/_snippets/example-links/jump-start.md-->

If you want to jump straight to a specific hook other than `encode` you can do so by simplify destructing to the desired hook. For example here we write anyware for `exchange`:

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
