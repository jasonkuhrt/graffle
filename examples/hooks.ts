import { GraphQLClient } from '../src'
;(async function () {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const graphQLClient = new GraphQLClient(endpoint, {
    hooks: {
      beforeRequest(req) {
        const requestId = Math.random().toString(16).slice(2)
        console.log(`${req.operationName}:${requestId} started`)
        return {
          requestId,
          startTime: new Date(),
        }
      },
      onError(err, req, state) {
        if (err instanceof Error) {
          const durationMs = new Date().getTime() - state.startTime.getTime()
          console.error(`${req.operationName}:${state.requestId} -> ${err.message} (${durationMs}ms)`)
        }
      },
      onCompleted(res, req, state) {
        const durationMs = new Date().getTime() - state.startTime.getTime()
        console.log(`${req.operationName}:${state.requestId} -> ${res.status} (${durationMs}ms)`)
      },
    },
  })

  const query = /* GraphQL */ `
    {
      Movie(title: "Inception") {
        releaseDate
        actors {
          name
        }
      }
    }
  `

  interface TData {
    Movie: { releaseDate: string; actors: Array<{ name: string }> }
  }

  const data = await graphQLClient.request<TData>(query)
  console.log(JSON.stringify(data, undefined, 2))
})().catch((error) => console.error(error))
