# weapp-graphql-request (WIP)

> Forked from [graphql-request](https://www.npmjs.com/package/graphql-request)

Minimal GraphQL client supporting weapp environment.

## Install

```sh
npm i weapp-graphql-request weapp-fetch graphql
```

## Quick Start

```js
import { GraphQLClient } from 'weapp-graphql-request'
import { createFetch } from 'weapp-fetch'
// const weappFetch = createFetch(wx.request)
// const uniFetch = createFetch(uni.request)
// const taroFetch = createFetch(taro.request)
// etc..
const graphQLClient = new GraphQLClient('http://localhost:3000', {
  fetch: weappFetch
})

graphQLClient.request(query, variables).then((data) => console.log(data))
```

you should install `weapp-fetch` instead of other `fetch` implement because only this lib can run in weapp environment.

## Environment support

|weapp|alipay|swan|tt|qq|jd|quickapp|
|---|---|---|---|---|---|---|
|√|?|?|?|?|?|?|

## Framework support

|uni-app|taro|others|
|---|---|---|
|√|√|?|

## Usages

Refers to [graphql-request](https://www.npmjs.com/package/graphql-request)

You can read it's doc for usage, but there are some points not support.

<!-- 1. `GraphQLWebSocketClient`, cause weapp have another websocket implement which different from  `the standard`。 -->
1. `File upload`, weapp has no `Blob`/`File`/`FormData` class.

```js
import { GraphQLWebSocketClient } from 'weapp-graphql-request'
const task = wx.connectSocket({
  url: 'wss://example.qq.com',
  header:{
    'content-type': 'application/json'
  },
  protocols: ['protocol1']
})

const wsClient = new GraphQLWebSocketClient(task, { onInit, onAcknowledged, onPing, onPong })
```
