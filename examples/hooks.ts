import { GraphQLClient } from '../src'
;(async function () {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const graphQLClient = new GraphQLClient(endpoint, {
    hooks: {
      beforeRequest(req) {
        const startTime = new Date()
        const requestId = `${req.operationName}:${Math.random().toString(16).slice(2)}`
        console.log(`${requestId} -> Started`)
        return {
          requestId,
          startTime,
        }
      },
      onCompleted(res, req, state) {
        const durationMs = new Date().getTime() - state.startTime.getTime()
        console.log(`${state.requestId} -> ${res.statusText} (${durationMs}ms)`)
      },
      onError(err, res, req, state) {
        const durationMs = new Date().getTime() - state.startTime.getTime()
        if (err instanceof Error) {
          console.error(
            `${state.requestId} -> ${
              res.statusText === 'OK' ? 'GQL Error' : res.statusText
            } (${durationMs}ms)`,
            `\n${' '.repeat(state.requestId.length)} -> ${err.message.replace(/(.{75})..+/, '$1…')}`
          )
        }
      },
    },
  })
  const query = /* GraphQL */ `
    query LoadPerson($id: ID!) {
      person(id: $id) {
        id
        name
      }
    }
  `

  interface TData {
    person: { id: string; name: string }
  }

  const data = await graphQLClient.request<TData>(query, { id: 'cGVvcGxlOjE=' })
  console.log(JSON.stringify(data, undefined, 2))

  await graphQLClient.request<TData>(query, { id: null }).catch(() => {})

  // Output
  // -------------------------------------------------------------
  // LoadPerson:8024960d6ad6c -> Started
  // LoadPerson:8024960d6ad6c -> OK (412ms)
  // {
  //   "person": {
  //     "id": "cGVvcGxlOjE=",
  //     "name": "Luke Skywalker"
  //   }
  // }
  // LoadPerson:b0088af1e2888 -> Started
  // LoadPerson:b0088af1e2888 -> Internal Server Error (268ms)
  //                          -> Variable "$id" of non-null type "ID!" must not be null.: {"response":{"erro…
})().catch((error) => console.error(error))
