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
import { weappFetch } from 'weapp-fetch'

const graphQLClient = new GraphQLClient('http://localhost:3000', {
  fetch: weappFetch
})

graphQLClient.request(query, variables).then((data) => console.log(data))
```
