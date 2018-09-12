/// <reference lib="dom" />

import 'cross-fetch/polyfill'

import { ClientError, GraphQLError, Variables } from './types'

export { ClientError } from './types'

export class GraphQLClient {
  private url: string
  private options: RequestInit

  constructor(url: string, options?: RequestInit) {
    this.url = url
    this.options = options || {}
  }

  async rawRequest<T = any>(
    query: string,
    variables?: Variables,
  ): Promise<{
    data?: T
    extensions?: any
    headers: Request['headers']
    status: number
    errors?: GraphQLError[]
  }> {
    const { headers, ...others } = this.options

    const body = JSON.stringify({
      query,
      variables: variables ? variables : undefined,
    })

    const response = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body,
      ...others,
    })

    const result = await getResult(response)

    if (response.ok && !result.errors && result.data) {
      const { headers, status } = response
      return { ...result, headers, status }
    } else {
      const errorResult =
        typeof result === 'string' ? { error: result } : result
      throw new ClientError(
        { ...errorResult, status: response.status, headers: response.headers },
        { query, variables },
      )
    }
  }

  async request<T = any>(query: string, variables?: Variables): Promise<T> {
    const { headers, ...others } = this.options

    const body = JSON.stringify({
      query,
      variables: variables ? variables : undefined,
    })

    const response = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body,
      ...others,
    })

    const result = await getResult(response)

    if (response.ok && !result.errors && result.data) {
      return result.data
    } else {
      const errorResult =
        typeof result === 'string' ? { error: result } : result
      throw new ClientError(
        { ...errorResult, status: response.status },
        { query, variables },
      )
    }
  }

  setHeaders(headers: Response['headers']): GraphQLClient {
    this.options.headers = headers

    return this
  }

  setHeader(key: string, value: string): GraphQLClient {
    const { headers } = this.options

    if (headers) {
      headers[key] = value
    } else {
      this.options.headers = { [key]: value }
    }
    return this
  }
}

export async function rawRequest<T = any>(
  url: string,
  query: string,
  variables?: Variables,
): Promise<{
  data?: T
  extensions?: any
  headers: Request['headers']
  status: number
  errors?: GraphQLError[]
}> {
  const client = new GraphQLClient(url)

  return client.rawRequest<T>(query, variables)
}

export async function request<T = any>(
  url: string,
  query: string,
  variables?: Variables,
): Promise<T> {
  const client = new GraphQLClient(url)

  return client.request<T>(query, variables)
}

export default request

async function getResult(response: Response): Promise<any> {
  const contentType = response.headers.get('Content-Type')
  if (contentType && contentType.startsWith('application/json')) {
    return response.json()
  } else {
    return response.text()
  }
}
