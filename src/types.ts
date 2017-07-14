export type Variables = { [key: string]: any }

export interface Options {
  method?: RequestInit['method']
  headers?: { [key: string]: string }
  mode?: RequestInit['mode']
  credentials?: RequestInit['credentials']
  cache?: RequestInit['cache']
  redirect?: RequestInit['redirect']
  referrer?: RequestInit['referrer']
  referrerPolicy?: RequestInit['referrerPolicy']
  integrity?: RequestInit['integrity']
}

export interface GraphQLError {
  message: string
  locations: { line: number, column: number }[]
  path: string[]
}

export interface GraphQLResponse {
  data?: any
  errors?: GraphQLError[]
  status: number
  [key: string]: any
}

export interface GraphQLRequestContext {
  query: string
  variables?: Variables
}

export class ClientError extends Error {

  response: GraphQLResponse
  request: GraphQLRequestContext

  constructor(response: GraphQLResponse, request: GraphQLRequestContext) {
    const message = `${ClientError.extractMessage(response)}: ${JSON.stringify({ response, request })}`

    super(message)

    this.response = response
    this.request = request

    Error.captureStackTrace(this, ClientError)
  }

  private static extractMessage(response: GraphQLResponse): string {
    try {
      return response.errors![0].message
    } catch (e) {
      return `GraphQL Error (Code: ${response.status})`
    }
  }
}
