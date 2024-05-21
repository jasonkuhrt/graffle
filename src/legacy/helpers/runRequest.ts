import { ACCEPT_HEADER, CONTENT_TYPE_GQL, CONTENT_TYPE_HEADER, CONTENT_TYPE_JSON } from '../../lib/http.js'
import { casesExhausted, uppercase, zip } from '../../lib/prelude.js'
import { ClientError } from '../classes/ClientError.js'
import type { GraphQLExecutionResultSingle } from '../lib/graphql.js'
import {
  cleanQuery,
  isGraphQLContentType,
  isRequestResultHaveErrors,
  parseGraphQLExecutionResult,
} from '../lib/graphql.js'
import { defaultJsonSerializer } from './defaultJsonSerializer.js'
import type {
  BatchVariables,
  Fetch,
  FetchOptions,
  GraphQLClientResponse,
  HTTPMethodInput,
  JsonSerializer,
  RequestMiddleware,
  Variables,
} from './types.js'

interface Input {
  url: string
  /**
   * The HTTP method to use for queries. Note that mutations are ALWAYS sent as POST requests ([per spec](https://github.com/graphql/graphql-over-http/blob/main/spec/GraphQLOverHTTP.md?rgh-link-date=2022-06-02T09%3A30%3A53Z)).
   *
   * @defaultValue `'POST'`
   */
  method?: HTTPMethodInput
  fetch?: Fetch
  fetchOptions: FetchOptions
  headers?: HeadersInit
  middleware?: RequestMiddleware
  request:
    | {
      _tag: 'Single'
      variables?: Variables
      document: {
        expression: string
        isMutation: boolean
        operationName?: string
      }
    }
    | {
      _tag: 'Batch'
      query: string[]
      operationName?: undefined
      hasMutations: boolean
      variables?: BatchVariables
    }
}

// @ts-expect-error todo
export const runRequest = async (input: Input): Promise<ClientError | GraphQLClientResponse<any>> => {
  // todo make a Config type
  const config = {
    ...input,
    method: input.request._tag === `Single`
      ? input.request.document.isMutation
        ? `POST`
        : uppercase(input.method ?? `post`)
      : input.request.hasMutations
      ? `POST`
      : uppercase(input.method ?? `post`),
    fetchOptions: {
      ...input.fetchOptions,
      errorPolicy: input.fetchOptions.errorPolicy ?? `none`,
    },
  }
  const fetcher = createFetcher(config.method)
  const fetchResponse = await fetcher(config)

  if (!fetchResponse.ok) {
    return new ClientError(
      { status: fetchResponse.status, headers: fetchResponse.headers },
      {
        query: input.request._tag === `Single` ? input.request.document.expression : input.request.query,
        variables: input.request.variables,
      },
    )
  }

  const result = await parseResultFromResponse(
    fetchResponse,
    input.fetchOptions.jsonSerializer ?? defaultJsonSerializer,
  )

  if (result instanceof Error) throw result // todo something better

  const clientResponseBase = {
    status: fetchResponse.status,
    headers: fetchResponse.headers,
  }

  if (isRequestResultHaveErrors(result) && config.fetchOptions.errorPolicy === `none`) {
    // todo this client response on error is not consistent with the data type for success
    const clientResponse = result._tag === `Batch`
      ? { ...result.executionResults, ...clientResponseBase }
      : {
        ...result.executionResult,
        ...clientResponseBase,
      }
    // @ts-expect-error todo
    return new ClientError(clientResponse, {
      query: input.request._tag === `Single` ? input.request.document.expression : input.request.query,
      variables: input.request.variables,
    })
  }
  switch (result._tag) {
    case `Single`:
      // @ts-expect-error todo
      return {
        ...clientResponseBase,
        ...executionResultClientResponseFields(config)(result.executionResult),
      }
    case `Batch`:
      return {
        ...clientResponseBase,
        data: result.executionResults.map(executionResultClientResponseFields(config)),
      }
    default:
      casesExhausted(result)
  }
}

const executionResultClientResponseFields = ($params: Input) => (executionResult: GraphQLExecutionResultSingle) => {
  return {
    extensions: executionResult.extensions,
    data: executionResult.data,
    errors: $params.fetchOptions.errorPolicy === `all` ? executionResult.errors : undefined,
  }
}

const parseResultFromResponse = async (response: Response, jsonSerializer: JsonSerializer) => {
  const contentType = response.headers.get(CONTENT_TYPE_HEADER)
  const text = await response.text()
  if (contentType && isGraphQLContentType(contentType)) {
    return parseGraphQLExecutionResult(jsonSerializer.parse(text))
  } else {
    // todo what is this good for...? Seems very random/undefined
    return parseGraphQLExecutionResult(text)
  }
}

const createFetcher = (method: 'GET' | 'POST') => async (params: Input) => {
  const headers = new Headers(params.headers)
  let searchParams: URLSearchParams | null = null
  let body = undefined

  if (!headers.has(ACCEPT_HEADER)) {
    headers.set(ACCEPT_HEADER, [CONTENT_TYPE_GQL, CONTENT_TYPE_JSON].join(`, `))
  }

  if (method === `POST`) {
    const $jsonSerializer = params.fetchOptions.jsonSerializer ?? defaultJsonSerializer
    body = $jsonSerializer.stringify(buildBody(params))
    if (typeof body === `string` && !headers.has(CONTENT_TYPE_HEADER)) {
      headers.set(CONTENT_TYPE_HEADER, CONTENT_TYPE_JSON)
    }
  } else {
    searchParams = buildQueryParams(params)
  }

  const init: RequestInit = { method, headers, body, ...params.fetchOptions }

  let url = new URL(params.url)
  let initResolved = init

  if (params.middleware) {
    const result = await Promise.resolve(
      params.middleware({
        ...init,
        url: params.url,
        operationName: params.request._tag === `Single` ? params.request.document.operationName : undefined,
        variables: params.request.variables,
      }),
    )
    const { url: urlNew, ...initNew } = result
    url = new URL(urlNew)
    initResolved = initNew
  }

  if (searchParams) {
    searchParams.forEach((value, name) => {
      url.searchParams.append(name, value)
    })
  }

  const $fetch = params.fetch ?? fetch
  return await $fetch(url, initResolved)
}

const buildBody = (params: Input) => {
  switch (params.request._tag) {
    case `Single`:
      return {
        query: params.request.document.expression,
        variables: params.request.variables,
        operationName: params.request.document.operationName,
      }
    case `Batch`:
      return zip(params.request.query, params.request.variables ?? []).map(([query, variables]) => ({
        query,
        variables,
      }))
    default:
      throw casesExhausted(params.request)
  }
}

const buildQueryParams = (params: Input): URLSearchParams => {
  const $jsonSerializer = params.fetchOptions.jsonSerializer ?? defaultJsonSerializer
  const searchParams = new URLSearchParams()
  switch (params.request._tag) {
    case `Single`: {
      searchParams.append(`query`, cleanQuery(params.request.document.expression))
      if (params.request.variables) {
        searchParams.append(`variables`, $jsonSerializer.stringify(params.request.variables))
      }
      if (params.request.document.operationName) {
        searchParams.append(`operationName`, params.request.document.operationName)
      }
      return searchParams
    }
    case `Batch`: {
      const variablesSerialized = params.request.variables?.map((v) => $jsonSerializer.stringify(v)) ?? []
      const queriesCleaned = params.request.query.map(cleanQuery)
      const payload = zip(queriesCleaned, variablesSerialized).map(([query, variables]) => ({
        query,
        variables,
      }))
      searchParams.append(`query`, $jsonSerializer.stringify(payload))
      return searchParams
    }
    default:
      throw casesExhausted(params.request)
  }
}
