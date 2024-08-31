import { inspect } from 'node:util'

export const publicGraphQLSchemaEndpoints = {
  SocialStudies: `https://countries.trevorblades.com/graphql`,
}

export const show = (value: unknown) => {
  console.log(inspect(value, { depth: null, colors: true }))
}

export const showJson = (value: unknown) => {
  console.log(JSON.stringify(value, null, 2))
}
