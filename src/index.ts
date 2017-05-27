import fetch, {Response} from 'node-fetch'

export interface NodeQLOptions {
  headers?: { [key: string]: string }
}

export default class NodeQLClient {
  private url: string
  private options: NodeQLOptions

  constructor(url: string, options?: NodeQLOptions) {
    this.url = url
    this.options = {
      headers: (options && options.headers) ? options.headers : {},
    }
  }

  async query<T extends any>(query: string, variables?: { [key: string]: any }): Promise<T> {
    const body = JSON.stringify({
      query,
      variables: variables ? variables : undefined,
    })

    const response = await fetch(this.url, {
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, this.options.headers),
      body,
    })

    const result = await getResult(response)

    if (response.ok && !result.errors && !result.error) {
      return result.data
    } else {
      throw new Error(JSON.stringify({
        status: response.status,
        result,
        query,
        variables,
      }, null, 2))
    }
  }
}

async function getResult(response: Response): Promise<any> {
  if (response.headers.get('Content-Type') === 'application/json') {
    return await response.json()
  } else {
    return await response.text()
  }
}
