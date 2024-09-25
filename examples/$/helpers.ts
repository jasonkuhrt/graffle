export * from './show.js'

export const documentQueryContinents = {
  document: `query { continents { name } }`,
}

export const publicGraphQLSchemaEndpoints = {
  Atlas: `https://countries.trevorblades.com/graphql`,
  Pokemon: `http://localhost:3000/graphql`,
}

export const dynamicValue = `DYNAMIC_VALUE`
