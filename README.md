# graphql-request

Minimal GraphQL client supporting Node and browsers for scripts or simple apps

![GitHub Action](https://github.com/jasonkuhrt/graphql-request/workflows/trunk/badge.svg) [![npm version](https://badge.fury.io/js/graphql-request.svg)](https://badge.fury.io/js/graphql-request)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Highlights](#highlights)
- [Install](#install)
- [Quick Start](#quick-start)
- [Examples](#examples)
- [Node Version Support](#node-version-support)
- [Reference](#reference)
  - [Configuration](#configuration)
    - [ErrorPolicy](#errorpolicy)
      - [None (default)](#none-default)
      - [Ignore](#ignore)
      - [All](#all)
- [Knowledge Base](#knowledge-base)
  - [Why was the file upload feature taken away? Will it return?](#why-was-the-file-upload-feature-taken-away-will-it-return)
  - [Why do I have to install `graphql`?](#why-do-i-have-to-install-graphql)
  - [Do I need to wrap my GraphQL documents inside the `gql` template exported by `graphql-request`?](#do-i-need-to-wrap-my-graphql-documents-inside-the-gql-template-exported-by-graphql-request)
  - [What's the difference between `graphql-request`, Apollo and Relay?](#whats-the-difference-between-graphql-request-apollo-and-relay)
  - [Why is the package `main` field missing?](#why-is-the-package-main-field-missing)
  - [How do I work around React Native + Metro's lack of `exports` support?](#how-do-i-work-around-react-native--metros-lack-of-exports-support)
  - [Get typed GraphQL Queries with GraphQL Code Generator](#get-typed-graphql-queries-with-graphql-code-generator)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Highlights

- Most **simple & lightweight** GraphQL client
- Promise-based API (works with `async` / `await`)
- ESM native package (CJS build is included for now as well, but will eventually be removed)
- First class TypeScript support
- Isomorphic (works in both Nodejs and Browsers)

## Install

```sh
npm add graphql-request graphql
```

## Quick Start

Send a GraphQL document using a static request function:

```js
import { request, gql } from 'graphql-request'

const document = gql`
  {
    company {
      ceo
    }
  }
`
await request('https://api.spacex.land/graphql/', document)
```

The function can be passed a configuration object for more complex cases:

```ts
await request({
  url,
  document,
  variables,
  requestHeaders,
})
```

A class is available for constructing your own instances:

```js
import { GraphQLClient } from 'graphql-request'

const document = gql`
  {
    company {
      ceo
    }
  }
`
const client = new GraphQLClient(endpoint)
await request('https://api.spacex.land/graphql/', document)
```

## Examples

- [Incrementally setting headers](./examples//incrementally-set-headers.ts)
- [Set endpoint](./examples/set-endpoint.ts)
- [Use Custom JSON Serializer](./examples/request-json-serializer.ts)
- [Fetch: Passing Options](./examples/fetch-options.ts)
- [Fetch: Use custom function](./examples/fetch-custom-function.ts)
- [Request: Authentication via HTTP header](./examples/request-authentication-via-http-header.ts)
- [Request: Method GET](./examples/request-method-get.ts)
- [Request: Cancellation](./examples/request-cancellation.ts)
- [Request: Headers Per Request (static)](./examples/request-headers-static-per-request.ts)
- [Request: Headers Per Request (dynamic)](./examples/request-headers-dynamic-per-request.ts)
- [Request: Cookie support for Nodejs](./examples/request-cookie-support-for-node.ts)
- [Request: Handle Raw Response](./examples/request-handle-raw-response.ts)
- [GraphQL: Document Variables](./examples/graphql-document-variables.ts)
- [GraphQL: Mutation](./examples/graphql-mutations.ts)
- [GraphQL: Batch Request](./examples/batching-requests.ts)
- [Error Handling](./examples/error-handling.ts)
- [CommonJS Support](./examples/package-commonjs.ts)

## Node Version Support

We only officially support [LTS Node versions](https://github.com/nodejs/Release#release-schedule). We also make an effort to support two additional versions:

1. The latest even Node version if it is not LTS already.
2. The odd Node version directly following the latest even version.

You are free to try using other versions of Node (e.g. `13.x`) with `graphql-request` but at your own risk.

## Reference

⚠️ This reference is incomplete. Check out the [examples](./examples/) for more reference material.

### Configuration

#### ErrorPolicy

By default GraphQLClient will throw when an error is received. However, sometimes you still want to resolve the (partial) data you received.
You can define `errorPolicy` in the `GraphQLClient` constructor.

```ts
const client = new GraphQLClient(endpoint, { errorPolicy: 'all' })
```

##### None (default)

Allow no errors at all. If you receive a GraphQL error the client will throw.

##### Ignore

Ignore incoming errors and resolve like no errors occurred

##### All

Return both the errors and data, only works with `rawRequest`.

## Knowledge Base

#### Why was the file upload feature taken away? Will it return?

In [this issue](https://github.com/jasonkuhrt/graphql-request/issues/500) we decided to make this library more stable and maintainable. In principal the feature is still in scope of this library and will make a return when we find time to do the feature right.

#### Why do I have to install `graphql`?

`graphql-request` uses methods exposed by the `graphql` package to handle some internal logic. On top of that, for TypeScript users, some types are used from the `graphql` package to provide better typings.

#### Do I need to wrap my GraphQL documents inside the `gql` template exported by `graphql-request`?

No. It is there for convenience so that you can get the tooling support like prettier formatting and IDE syntax highlighting. You can use `gql` from `graphql-tag` if you need it for some reason too.

#### What's the difference between `graphql-request`, Apollo and Relay?

`graphql-request` is the most minimal and simplest to use GraphQL client. It's perfect for small scripts or simple apps.

Compared to GraphQL clients like Apollo or Relay, `graphql-request` doesn't have a built-in cache and has no integrations for frontend frameworks. The goal is to keep the package and API as minimal as possible.

#### Why is the package `main` field missing?

The `main` field was deprecated by Node.js on April 23 2019 when version 12 was released, in favour of [entrypoints (`exports` package manifest field)](https://nodejs.org/api/packages.html#package-entry-points). I believe enough time has passed that tools should be adopting the new standards now.

#### How do I work around React Native + Metro's lack of `exports` support?

You might encounter the error below when you try to build a React Native app that uses `graphql-request`:

```
Error: While trying to resolve module "graphql-request" from file "/path/to/src/App.ts", the package "/path/to/node_modules/graphql-request/package.json" was successfully found. However, this package itself specifies a "main" module field that could not be resolved ("/path/to/node_modules/graphql-request/index".
```

This happens because Metro [does not support yet](https://github.com/facebook/metro/issues/670) the `exports` field in package.json. A workaround for this problem is to edit the `metro.config.js` file in your project and add a new [`resolveRequest`](https://facebook.github.io/metro/docs/configuration/#resolverequest) for `graphql-request`. Like this:

```javascript
resolver: {
  resolveRequest: (context, moduleName, platform) => {
    if (moduleName.startsWith('graphql-request')) {
      return {
        filePath: `${__dirname}/node_modules/graphql-request/build/esm/index.js`,
        type: 'sourceFile',
      }
    }

    return context.resolveRequest(context, moduleName, platform)
  }
}
```

After doing this change, clear Metro's cache and restart your application.

#### Get typed GraphQL Queries with GraphQL Code Generator

`graphql-request@^5` supports `TypedDocumentNode`, the typed counterpart of `graphql`'s `DocumentNode`.

Installing and configuring [GraphQL Code Generator](https://www.the-guild.dev/graphql/codegen) requires a few steps in order to get end-to-end typed GraphQL operations using the provided `graphql()` helper:

```ts
import request from 'graphql-request'
import { graphql } from './gql/gql'

const getMovieQueryDocument = graphql(gql`
  query getMovie($title: String!) {
    Movie(title: $title) {
      releaseDate
      actors {
        name
      }
    }
  }
`)

const data = await request(
  'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr',
  getMovieQueryDocument,
  // variables are type-checked!
  { title: 'Inception' }
)

// `data.Movie` is typed!
```

[_The complete example is available in the GraphQL Code Generator repository_](https://github.com/dotansimha/graphql-code-generator/tree/master/examples/front-end/react/graphql-request)

Visit GraphQL Code Generator's dedicated guide to get started: https://www.the-guild.dev/graphql/codegen/docs/guides/react-vue.
