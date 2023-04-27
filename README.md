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
  - [What sets `graphql-request` apart from other clients like Apollo, Relay, etc.?](#what-sets-graphql-request-apart-from-other-clients-like-apollo-relay-etc)
  - [Why is the package `main` field missing?](#why-is-the-package-main-field-missing)
  - [How do I work around React Native + Metro's lack of `exports` support?](#how-do-i-work-around-react-native--metros-lack-of-exports-support)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Highlights

- Most **simple & lightweight** GraphQL client
- Promise-based API (works with `async` / `await`)
- ESM native package (CJS build is included for now as well, but will eventually be removed)
- First class TypeScript support
  - Including `TypedDocumentNode`
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

- Request:
  - [Authentication via HTTP header](./examples/request-authentication-via-http-header.ts)
  - [Method GET](./examples/request-method-get.ts)
  - [Cancellation](./examples/request-cancellation.ts)
  - [Headers Per Request (static)](./examples/request-headers-static-per-request.ts)
  - [Headers Per Request (dynamic)](./examples/request-headers-dynamic-per-request.ts)
  - [Cookie support for Nodejs](./examples/request-cookie-support-for-node.ts)
  - [Handle Raw Response](./examples/request-handle-raw-response.ts)
- GraphQL:
  - [Document Variables](./examples/graphql-document-variables.ts)
  - [Mutation](./examples/graphql-mutations.ts)
  - [Batching Requests](./examples/graphql-batching-requests.ts)
- Configuration:
  - [Fetch: Passing Options](./examples/configuration-fetch-options.ts)
  - [Fetch: Use custom function](./examples/configuration-fetch-custom-function.ts)
  - [Custom JSON Serializer](./examples/configuration-request-json-serializer.ts)
  - [Incremental: Set Endpoint](./examples/configuration-incremental-endpoint.ts)
  - [Incremental: Set Request Headers](./examples/configuration-incremental-request-headers.ts)
- Community
  - [GraphQL Code Generator for typed GraphQL Queries](./examples/community-graphql-code-generator.ts)
- TypeScript
  - [Use `TypedDocumentNode`](./examples/typescript-typed-document-node.ts)
- Other:
  - [Middleware](./examples/other-middleware.ts)
  - [Error Handling](./examples/other-error-handling.ts)
  - [OCommonJS Support](./examples/other-package-commonjs.ts)

## Node Version Support

We only (officially) support [versions of Nodejs](https://github.com/nodejs/Release#release-schedule) of the following status:

- Current
- LTS
- Maintenance _and end of life not yet reached_

So for example on May 1 2023 that would mean these versions: 16, 18, 19.

Any issue that exists solely for an unsupported version of Nodejs will be rejected (not worked on).

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

#### What sets `graphql-request` apart from other clients like Apollo, Relay, etc.?

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
