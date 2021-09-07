import { batchRequests } from '../src'
;(async function () {
  const endpoint = 'https://api.spacex.land/graphql/'

  const query1 = /* GraphQL */ `
    query ($id: ID!) {
      capsule(id: $id) {
        id
        landings
      }
    }
  `
  const variables1 = {
    id: 'C105',
  }

  interface TData1 {
    data: { capsule: { id: string; landings: number } }
  }

  const query2 = /* GraphQL */ `
    {
      rockets(limit: 10) {
        active
      }
    }
  `

  interface TData2 {
    data: { rockets: { active: boolean }[] }
  }

  const query3 = /* GraphQL */ `
    query ($id: ID!) {
      core(id: $id) {
        id
        block
        original_launch
      }
    }
  `

  const variables3 = {
    id: 'B1015',
  }

  interface TData3 {
    data: { core: { id: string; block: number; original_launch: string } }
  }

  const data = await batchRequests<[TData1, TData2, TData3]>(endpoint, [
    { document: query1, variables: variables1 },
    { document: query2 },
    { document: query3, variables: variables3 },
  ])
  console.log(JSON.stringify(data, undefined, 2))
})().catch((error) => console.error(error))
