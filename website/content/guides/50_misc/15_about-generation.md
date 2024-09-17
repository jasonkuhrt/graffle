# About Generation <GeneratedClientBadge />

This guide is an overview of using generation. Individual features enabled by generation are discussed in other guides. There is a [practical tutorial in getting started](../overview/getting-started-generated.md). But if you're trying to build a mental model of what Graffle means when it talks about generation or generally want more detail on generation tools, then this guide is for you.

## Benefits

If you haven't read the [introduction](../overview/introduction.md), here is a recap of benefits from generation:

<!--@include: @/_snippets/benefits.md-->

## Architecture

TODO

## Multiple Clients

Sometimes you need to work with multiple schemas in one project, for example imagine having to use both the Shopify API and GitHub API. In such a case you may want to name your clients differently. Naming them has the advantage of changing the generated namespace name making it easier for you to auto-import. For that matter even when using a single client you may prefer to name it semantically.

Here is an example walkthrough.

1. You generate a client for GitHub. The default output goes to `./github`.

   ```sh
   pnpm graffle --name Github --schema '...'
   ```

2. You can now import from it:

   ```ts
   import { Github } from './github/index.js'

   const github = Github.create({
     transport: { headers: { authorization: '...' } },
   })

   const repos = await github.query.viewer({ repos: { name: true } })
   ```

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
