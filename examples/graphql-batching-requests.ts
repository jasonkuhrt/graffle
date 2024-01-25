/**
 * It is possible with `graphql-request` to use batching via the `batchRequests()` function.
 * @see https://github.com/graphql/graphql-over-http/blob/main/rfcs/Batching.md
 */
import { batchRequests, gql } from '../src/entrypoints/main.js'

const endpoint = `https://api.spacex.land/graphql/`

const query1 = gql`
  query ($id: ID!) {
    capsule(id: $id) {
      id
      landings
    }
  }
`
const variables1 = {
  id: `C105`,
}

interface Data1 {
  data: { capsule: { id: string; landings: number } }
}

const query2 = gql`
  {
    rockets(limit: 10) {
      active
    }
  }
`

interface Data2 {
  data: { rockets: { active: boolean }[] }
}

const query3 = gql`
  query ($id: ID!) {
    core(id: $id) {
      id
      block
      original_launch
    }
  }
`

const variables3 = {
  id: `B1015`,
}

interface Data3 {
  data: { core: { id: string; block: number; original_launch: string } }
}

const data = await batchRequests<[Data1, Data2, Data3]>(endpoint, [
  { document: query1, variables: variables1 },
  { document: query2 },
  { document: query3, variables: variables3 },
])
console.log(data)
