import GraphQLClient from './GraphQLClient'
import { Variables } from './types'

export default async function request<T extends any>(
  url: string,
  query: string,
  variables?: Variables,
): Promise<T> {
  const client = new GraphQLClient(url)

  return client.request<T>(query, variables)
}
