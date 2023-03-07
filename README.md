# weapp-graphql-request (WIP)

> Forked from [graphql-request](https://www.npmjs.com/package/graphql-request)

Minimal GraphQL client supporting weapp environment.

## Install

```sh
npm i weapp-graphql-request weapp-fetch graphql
```

## Quick Start

```js
import { GraphQLClient, gql } from 'weapp-graphql-request'
import { weappFetch, createWeappFetch } from 'weapp-fetch'
// weappFetch is createWeappFetch(wx.request)
// const uniFetch = createWeappFetch(uni.request)
// const taroFetch = createWeappFetch(taro.request)
// etc..
const graphQLClient = new GraphQLClient('http://localhost:3000', {
  fetch: weappFetch
})

graphQLClient.request(query, variables).then((data) => console.log(data))
```

you should install `weapp-fetch` instead of other `fetch` implement because only this lib can run in weapp environment.

## Usages

Refers to [graphql-request](https://www.npmjs.com/package/graphql-request)

You can read it's doc for usage, but there are some points not support. 

1. `GraphQLWebSocketClient`, cause weapp have another websocket implement which different from  `the standard`。
2. `File upload`, weapp has no `Blob`/`File`/`FormData` class.
