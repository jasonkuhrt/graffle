# graphql-request

Minimal GraphQL client supporting Node and browsers for scripts or simple apps

## Install

```sh
npm install graphql-request
```

## Quickstart

```js
import request from 'graphql-request'

async function printMovie() {
  const { Movie } = await request('https://api.graph.cool/simple/v1/movies', `
  {
    Movie(title: "Inception") {
      releaseDate
      actors {
        name
      }
    }
  }`

  console.log(Movie)
}

printMovie()

```

## Usage

### Single function: `request`

> TODO

### Client

> TODO

## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
