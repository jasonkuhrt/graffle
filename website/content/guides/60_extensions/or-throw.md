# Or Throw

<!--@include: @/_snippets/example-links/extension_or-throw.md-->

## Introduction

The `OrThrow` extension decorates the builder with new methods for sending requests that will always throw on any error.

If you do not configure your base instance's output to always throw but still find utility for that in some cases then this extension brings you a more convenient way to achieve that than one-off requests to [`.with`](../methods/with.md), whilst maintaining type safety.

Example before/after:

```ts
graffle.with({
  output: {
    envelope: {
      // enabled: true | false <-- Your choice here
      errors: {
        execution: false,
        other: false,
        schema: false,
      },
    },
    errors: {
      execution: `throw`,
      other: `throw`,
      schema: `throw`,
    },
  },
}).query.foo()
```

```ts
graffle.query.fooOrThrow()
```

## Getting Started

`OrThrow` is a first party extension shipping in the graffle package.

```ts twoslash
import { Graffle } from 'graffle'
import { OrThrow } from 'graffle/extensions'

const graffle = Graffle.create({ schema: '...' }).use(OrThrow())
```

Then access any request method's Or Throw variant:

```ts
graffle.documentOrThrow(...).run(...)
graffle.query.fooOrThrow()
graffle.mutation.fooOrThrow()
```

## Methods

For every request method on the client a new method is added whose name is the same base name with `"OrThrow"` (by default) added as a suffix. For example:

```
Base                  Added by Or Throw
----                  -----------------
graffle.raw           graffle.rawOrThrow
graffle.document      graffle.documentOrThrow
graffle.query.foo     graffle.query.fooOrThrow
graffle.query.bar     graffle.query.barOrThrow
...                   ...
```

Non-request methods like `"graffle.use(...)"` are ignored, so you will not see `graffle.useOrThrow` etc.

## Configuration

### Suffix

You can change the suffix to something else if you prefer. For example:

```ts twoslash
import { Graffle } from 'graffle'
import { OrThrow } from 'graffle/extensions'
// ---cut---
const graffle = Graffle
  .create({ schema: '...' })
  .use(OrThrow({ suffix: '_' }))
//               ^^^^^^^^^^^

graffle.raw_
//      ^^^^
```

## Known Issues

### Conflicting Schema Root Field Names

> [!info] You can probably ignore this issue but for thoroughness and transparency it is documented here should you be one of the few affected. If you do, please open an issue to help us prioritize a fix (there is one) or better yet submit a PR (hint: have the extension use the runtime schema index to ensure it only deals with its OrThrow added methods).

Imagine that you are:

1. Using the generated client
2. Using the Or Throw extension
3. Using its default suffix (`OrThrow`)
4. And you have a schema that includes this:
   ```gql
   Query {
     doThingOrThrow: IgnoreMe
     #      ^^^^^^^ Notice this.
   }
   ```

Then, your client would include these methods:

```ts
graffle.query.fooOrThrow()
graffle.query.fooOrThrowOrThrow()
```

_The issue is that both methods will run using the `OrThrow` semantics meaning `fooOrThrow` will always be executed as if you executed `fooOrThrowOrThrow`._

Workarounds:

1. Use [`.document(...)`](../20_methods/document.md) e.g.
   ```ts
   graffle.document({ query: { fooOrThrow: {/* ... */} } })
   ```
2. [Change the Or Throw suffix](#suffix) to something that doesn't conflict with your schema.
