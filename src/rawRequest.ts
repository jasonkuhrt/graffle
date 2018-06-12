import { GraphQLError, Variables } from './types'
import GraphQLClient from './GraphQLClient'

export default async function rawRequest<T extends any>(
  url: string,
  query: string,
  variables?: Variables,
): Promise<{ data?: T, extensions?: any, headers: Headers, status: number, errors?: GraphQLError[] }> {
  const client = new GraphQLClient(url)

  return client.rawRequest<T>(query, variables)
}
