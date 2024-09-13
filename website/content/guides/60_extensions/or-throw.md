# Or Throw

<!--@include: @/guides/_example_links/extension_or-throw.md-->

The `OrThrow` extension decorates the builder with new methods for sending requests that will always throw on any error.

It is a more convenient way to send one off requests that throw than manually using [`.with`](../methods/with.md) to configure output. Yet the results are just as type-safe as if you had.

## Getting Started

`OrThrow` is a first party extension shipping in the graffle package.

```ts twoslash
import { Graffle } from 'graffle'
import { OrThrow } from 'graffle/extensions'

const graffle = Graffle.create({ schema: '...' }).use(OrThrow())
```

## Methods

For every request method on the client a new method is added whose name is the same base name with `"OrThrow"` (by default) added as a suffix. For example:

```
Base                  Added by this extension
----                  -----------------------
graffle.raw           graffle.rawOrThrow
graffle.document      graffle.documentOrThrow
graffle.query.foo     graffle.query.fooOrThrow
graffle.query.bar     graffle.query.barOrThrow
...                   ...
```

Non-request methods like `"graffle.use(...)"` are ignored, so you will not see `graffle.useOrThrow` etc.

## Configuration

You can change the suffix to something else if you prefer. For example:

```ts twoslash
import { Graffle } from 'graffle'
import { OrThrow } from 'graffle/extensions'
// ---cut---
const graffle = Graffle.create().use(OrThrow({ suffix: '_' }))
graffle.raw_ // instead of graffle.rawOrThrow
```
