# Throws

<!--@include: @/_snippets/example-links/extension_throws.md-->

## Introduction

The `Throws` extension decorates the builder with a new method for adjusting output such that requests will throw on any error encountered.

This is convenient if you do not configure your base instance's output to always throw yet still find utility for doing so in some cases.

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
graffle.throws().query.foo()
```

## Getting Started

`Throws` is a first party extension shipping in the graffle package.

```ts twoslash
import { Graffle } from 'graffle'
import { Throws } from 'graffle/extensions'

const graffle = Graffle.create({ schema: '...' }).use(Throws())
```

Then chain `.throws()` whenever needed:

```ts
graffle.throws().document(...).run(...)
graffle.throws().query.foo()
graffle.throws().mutation.foo()
```
