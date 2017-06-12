import { ClientError, Options, Variables } from './types'
export { ClientError } from './types'
import 'isomorphic-fetch'

export async function request<T extends any>(url: string, query: string, variables?: Variables): Promise<T> {
  const client = new GraphQLClient(url)

  return client.request<T>(query, variables)
}

export default request

export class GraphQLClient {
  private url: string
  private options: Options

  constructor(url: string, options?: Options) {
    this.url = url
    this.options = {
      headers: (options && options.headers) ? options.headers : {},
    }
  }

  async request<T extends any>(query: string, variables?: Variables): Promise<T> {
    const body = JSON.stringify({
      query,
      variables: variables ? variables : undefined,
    })

    const response = await fetch(this.url, {
      method: 'POST',
      headers: Object.assign({'Content-Type': 'application/json'}, this.options.headers),
      body,
    })

    const result = await getResult(response)

    if (response.ok && !result.errors) {
      return result.data
    } else {
      throw new ClientError({data: result.data, errors: result.errors, status: response.status}, {query, variables})
    }
  }
}

async function getResult(response: Response): Promise<any> {
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.startsWith('application/json')) {
    return await response.json()
  } else {
    return await response.text()
  }
}
