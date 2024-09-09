# About Generation

This guide is an overview of using generation. Individual features enabled by generation are discussed in other guides. There is a [practical tutorial in getting started](../overview/getting-started-generated.md). But if you're trying to build a mental model of what Graffle means when it talks about generation or generally want more detail on generation tools, then this guide is for you.

## Benefits

If you haven't read the [introduction](../overview/introduction.md), here is a recap of benefits from generation:

<!--@include: @/_snippets/benefits.md-->

## Architecture

TODO

## CLI

Typically you will use the CLI to generate a client. After installing `graffle` you will have access to a CLI also named `graffle`.

```bash
pnpm add graffle
pnpm graffle --schema '...'
```

The CLI has built in help that you can use to learn about all its inputs.

```bash
pnpm graffle --help
```

## API

If you need to script graffle client generation then you can drop to the underlying Graffle generator API. It is largely one-to-one with the CLI. Use its JSDoc to learn about all its inputs.

```ts
import { generate } from 'graffle/generator'
```
