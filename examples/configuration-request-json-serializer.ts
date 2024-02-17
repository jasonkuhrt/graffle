/**
 * If you want to use non-standard JSON types, you can use your own JSON serializer to replace `JSON.parse`/`JSON.stringify` used by the `GraphQLClient`.
 * An original use case for this feature is `BigInt` support:
 */

import JSONbig from 'json-bigint'
import { gql, GraphQLClient } from '../src/entrypoints/main.js'

const jsonSerializer = JSONbig({ useNativeBigInt: true })
const graphQLClient = new GraphQLClient(`https://some-api`, { jsonSerializer })
const data = await graphQLClient.request<{ someBigInt: bigint }>(gql`
  {
    someBigInt
  }
`)
console.log(typeof data.someBigInt) // if >MAX_SAFE_INTEGER then 'bigint' else 'number'
