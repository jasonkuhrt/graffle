import { ClientError, Headers, Options, Variables } from './types'
export { ClientError } from './types'
import 'cross-fetch/polyfill'

export async function request<T extends any> (url: string, query: string, variables?: Variables): Promise<T> {
  const client = new GraphQLClient(url)

  return client.request<T>(query, variables)
}

export default request

export class GraphQLClient {
  private url: string
  private options: Options

  constructor (url: string, options?: Options) {
    this.url = url
    this.options = options || {}
  }

  async request<T extends any> (query: string, variables?: Variables): Promise<T> {
    const {
      headers,
      ...others,
    } = this.options

    const body = JSON.stringify({
      query,
      variables: variables ? variables : undefined,
    })

    const response = await fetch(this.url, {
      method: 'POST',
      headers: Object.assign({'Content-Type': 'application/json'}, headers),
      body,
      ...others,
    })

    const result = await getResult(response)!

    if (response.ok && !result.errors && result.data) {
      return result.data
    } else {
      const errorResult = typeof result === 'string' ? {error: result} : result
      throw new ClientError({ ...errorResult, status: response.status}, {query, variables})
    }
  }

  setHeaders (headers: Headers): GraphQLClient {
    this.options.headers = headers

    return this
  }
}

async function getResult (response: Response): Promise<any> {
  const contentType = response.headers.get('Content-Type')
  if (contentType && contentType.startsWith('application/json')) {
    return await response.json()
  } else {
    return await response.text()
  }
}
