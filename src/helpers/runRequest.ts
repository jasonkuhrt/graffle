import { ClientError } from '../classes/ClientError.js'
import {
  cleanQuery,
  isGraphQLContentType,
  isHasAtLeastSomeSuccess,
  parseGraphQLExecutionResult,
} from '../lib/graphql.js'
import { ACCEPT_HEADER, CONTENT_TYPE_GQL, CONTENT_TYPE_HEADER, CONTENT_TYPE_JSON } from '../lib/http.js'
import { casesExhausted, uppercase, zip } from '../lib/prelude.js'
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

interface Params {
  url: string
  method: HTTPMethodInput
  fetch: Fetch
  fetchOptions: FetchOptions
  headers?: HeadersInit
  middleware?: RequestMiddleware<Variables>
  request:
    | {
        _tag: 'Single'
        query: string
        operationName?: string
        variables?: Variables
      }
    | {
        _tag: 'Batch'
        query: string[]
        operationName?: undefined
        variables?: BatchVariables
      }
}

export const runRequest = async (params: Params): Promise<ClientError | GraphQLClientResponse<any>> => {
  const $params = {
    ...params,
    method: uppercase(params.method ?? `post`),
  }
  const fetcher = createFetcher($params.method)
  const response = await fetcher($params)
  const result = await getResult(response, params.fetchOptions.jsonSerializer ?? defaultJsonSerializer)

  const successfullyPassedErrorPolicy =
    result._tag === `Batch` ||
    result.executionResult._tag === `Data` ||
    (Array.isArray(result.executionResult.errors) && !result.executionResult.errors.length) ||
    params.fetchOptions.errorPolicy === `all` ||
    params.fetchOptions.errorPolicy === `ignore`

  const successfullyReceivedData = isHasAtLeastSomeSuccess(result)
  if (response.ok && successfullyPassedErrorPolicy && successfullyReceivedData) {
    const executionResults =
      params.fetchOptions.errorPolicy === `ignore`
        ? result._tag === `Batch`
          ? result.executionResults.map((_) => _.data)
          : result.executionResult.data
        : result._tag === `Batch`
          ? result.executionResults
          : result.executionResult
    const returnValue = params.request._tag === `Batch` ? { data: executionResults } : executionResults
    // @ts-expect-error TODO fixme
    return {
      ...returnValue,
      headers: response.headers,
      status: response.status,
    }
  } else {
    const errorResult = typeof result === `string` ? { error: result } : result
    return new ClientError(
      { ...errorResult, status: response.status, headers: response.headers },
      { query: params.request.query, variables: params.request.variables },
    )
  }
}

const getResult = async (response: Response, jsonSerializer: JsonSerializer) => {
  const contentType = response.headers.get(CONTENT_TYPE_HEADER)
  if (contentType && isGraphQLContentType(contentType)) {
    const text = await response.text()
    return parseGraphQLExecutionResult(jsonSerializer.parse(text))
  } else {
    return parseGraphQLExecutionResult(response.text())
  }
}

const createFetcher = (method: 'GET' | 'POST') => async (params: Params) => {
  const headers = new Headers(params.headers)
  let queryParams = ``
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
    queryParams = buildQueryParams(params)
  }

  const init: RequestInit = { method, headers, body, ...params.fetchOptions }

  let urlResolved = params.url
  let initResolved = init
  if (params.middleware) {
    const {
      url,
      request: { variables, operationName },
    } = params
    const result = await Promise.resolve(params.middleware({ ...init, url, operationName, variables }))
    const { url: urlNew, ...initNew } = result
    urlResolved = urlNew
    initResolved = initNew
  }
  if (queryParams) {
    urlResolved = `${urlResolved}?${queryParams}`
  }
  return await fetch(urlResolved, initResolved)
}

const buildBody = (params: Params) => {
  if (params.request._tag === `Single`) {
    const { query, variables, operationName } = params.request
    return { query, variables, operationName }
  } else if (params.request._tag === `Batch`) {
    return zip(params.request.query, params.request.variables ?? []).map(([query, variables]) => ({
      query,
      variables,
    }))
  } else {
    throw casesExhausted(params.request)
  }
}

const buildQueryParams = (params: Params): string => {
  const $jsonSerializer = params.fetchOptions.jsonSerializer ?? defaultJsonSerializer
  if (params.request._tag === `Single`) {
    const search: string[] = [`query=${encodeURIComponent(cleanQuery(params.request.query))}`]
    if (params.request.variables) {
      search.push(`variables=${encodeURIComponent($jsonSerializer.stringify(params.request.variables))}`)
    }
    if (params.request.operationName) {
      search.push(`operationName=${encodeURIComponent(params.request.operationName)}`)
    }
    return search.join(`&`)
  } else if (params.request._tag === `Batch`) {
    const variablesSerialized = params.request.variables?.map((v) => $jsonSerializer.stringify(v)) ?? []
    const queriesCleaned = params.request.query.map(cleanQuery)
    const payload = zip(queriesCleaned, variablesSerialized).map(([query, variables]) => ({
      query,
      variables,
    }))
    return `query=${encodeURIComponent($jsonSerializer.stringify(payload))}`
  } else {
    throw casesExhausted(params.request)
  }
}
