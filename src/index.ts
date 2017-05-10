import * as http from 'http'
import * as https from 'https'
import { parse } from 'url'

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

  query<T extends any>(queryStr: string, variables?: { [key: string]: any }): Promise<T> {


    const isHttps = this.url.startsWith('https')
    const postData = JSON.stringify({
      query: queryStr,
      variables: variables ? variables : undefined,
    })

    const parsedUrl = parse(this.url)
    const postOptions = {
      host: parsedUrl.host,
      port: parseInt(parsedUrl.port || (isHttps ? '443' : '80'), 10),
      path: parsedUrl.path,
      method: 'POST',
      headers: Object.assign({
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      }, this.options.headers),
    }


    return new Promise((resolve, reject) => {
      const handler = res => {
        if (res.statusCode !== 200) {
          reject(new Error(`Bad status code: ${res.statusCode}`))
        } else {
          res.setEncoding('utf8')
          res.on('data', data => {
            const result = JSON.parse(data.toString())
            if (result.errors) {
              reject(new Error(JSON.stringify(result.errors)))
            } else {
              resolve(result.data)
            }
          })
        }
      }

      const req = isHttps
        ? https.request(postOptions, handler)
        : http.request(postOptions, handler)

      req.write(postData)
      req.end()
    })
  }
}
