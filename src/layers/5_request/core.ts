import { type ExecutionResult } from 'graphql'
import { Anyware } from '../../lib/anyware/__.js'
import type { Grafaid } from '../../lib/grafaid/__.js'
import { getOperationDefinition, OperationTypeToAccessKind, print } from '../../lib/grafaid/document.js'
import { execute } from '../../lib/grafaid/execute.js'
import { operationTypeToRootType } from '../../lib/grafaid/graphql.js'
import {
  getRequestEncodeSearchParameters,
  getRequestHeadersRec,
  parseExecutionResult,
  postRequestEncodeBody,
  postRequestHeadersRec,
} from '../../lib/grafaid/http/http.js'
import { mergeRequestInit, searchParamsAppendAll } from '../../lib/http.js'
import { casesExhausted, isString } from '../../lib/prelude.js'
import { SelectionSetGraphqlMapper } from '../3_SelectGraphQLMapper/__.js'
import type { MappedResult } from '../3_SelectGraphQLMapper/toGraphQL.js'
import type { GraffleExecutionResultVar } from '../6_client/handleOutput.js'
import type { Config } from '../6_client/Settings/Config.js'
import { MethodMode, type MethodModeGetReads } from '../6_client/transportHttp/request.js'
import {
  type CoreExchangeGetRequest,
  type CoreExchangePostRequest,
  type HookMap,
  hookNamesOrderedBySequence,
  type HookSequence,
} from './hooks.js'
import { Transport } from './types.js'

export const graffleMappedToRequest = (
  { document, operationsVariables }: MappedResult,
  operationName?: string,
): Grafaid.RequestAnalyzedDocumentNodeInput => {
  // We get back variables for every operation in the Graffle document.
  // However, we only need the variables for the operation that was selected to be executed.
  // If there was NO operation name provided then we assume that the first operation in the document is the one that should be executed.
  // If there are MULTIPLE operations in the Graffle document AND the user has supplied an invalid operation name (either none or given matches none)
  // then what happens here is the variables from one operation can be mixed into another operation.
  // This shouldn't matter because such a state would be rejected by the server since it wouldn't know what operation to execute.
  const variables_ = operationName
    ? operationsVariables[operationName]
    : Object.values(operationsVariables)[0]

  const operation_ = getOperationDefinition({ query: document, operationName })
  if (!operation_) throw new Error(`Impossible.`)

  return {
    rootType: operationTypeToRootType[operation_.operation],
    operationName,
    operation: operation_,
    query: document,
    variables: variables_,
  }
}

export const anyware = Anyware.create<HookSequence, HookMap, ExecutionResult>({
  // If core errors caused by an abort error then raise it as a direct error.
  // This is an expected possible error. Possible when user cancels a request.
  passthroughErrorWith: (signal) => {
    // todo have anyware propagate the input that was passed to the hook that failed.
    // it will give us a bit more confidence that we're only allowing this abort error for fetch requests stuff
    // context.config.transport.type === Transport.http
    return signal.hookName === `exchange` && isAbortError(signal.error)
  },
  hookNamesOrderedBySequence,
  hooks: {
    encode: ({ input }) => {
      let request: Grafaid.RequestAnalyzedInput

      if (input.interfaceType === `raw`) {
        request = input.request
      } else {
        request = graffleMappedToRequest(SelectionSetGraphqlMapper.toGraphQL({
          document: input.request.document,
          options: {
            sddm: input.state.config.schemaMap,
          },
        }))
      }

      return {
        ...input,
        request,
      }
    },
    pack: {
      slots: {
        searchParams: getRequestEncodeSearchParameters,
        body: postRequestEncodeBody,
      },
      run: ({ input, slots }) => {
        const graphqlRequest: Grafaid.HTTP.RequestConfig = {
          ...input.request,
          query: print(input.request.query),
        }

        // TODO thrown error here is swallowed in examples.
        switch (input.transportType) {
          case `memory`: {
            return {
              ...input,
              request: graphqlRequest,
            }
          }
          case `http`: {
            if (input.state.config.transport.type !== Transport.http) throw new Error(`transport type is not http`)

            const operationType = isString(input.request.operation)
              ? input.request.operation
              : input.request.operation.operation
            const methodMode = input.state.config.transport.config.methodMode
            const requestMethod = methodMode === MethodMode.post
              ? `post`
              : methodMode === MethodMode.getReads // eslint-disable-line
              ? OperationTypeToAccessKind[operationType] === `read` ? `get` : `post`
              : casesExhausted(methodMode)

            const baseProperties = mergeRequestInit(
              mergeRequestInit(
                mergeRequestInit(
                  {
                    headers: requestMethod === `get` ? getRequestHeadersRec : postRequestHeadersRec,
                  },
                  {
                    headers: input.state.config.transport.config.headers,
                    signal: input.state.config.transport.config.signal,
                  },
                ),
                input.state.config.transport.config.raw,
              ),
              {
                headers: input.headers,
              },
            )
            const request: CoreExchangePostRequest | CoreExchangeGetRequest = requestMethod === `get`
              ? {
                methodMode: methodMode as MethodModeGetReads,
                ...baseProperties,
                method: `get`,
                url: searchParamsAppendAll(input.url, slots.searchParams(graphqlRequest)),
              }
              : {
                methodMode: methodMode,
                ...baseProperties,
                method: `post`,
                url: input.url,
                body: slots.body(graphqlRequest),
              }
            return {
              ...input,
              request,
            }
          }
          default:
            throw casesExhausted(input)
        }
      },
    },
    exchange: {
      slots: {
        // Put fetch behind a lambda so that it can be easily globally overridden
        // by fixtures.
        fetch: (request) => fetch(request),
      },
      run: async ({ input, slots }) => {
        switch (input.transportType) {
          case `http`: {
            const request = new Request(input.request.url, input.request)
            const response = await slots.fetch(request)
            return {
              ...input,
              response,
            }
          }
          case `memory`: {
            const result = await execute(input)
            return {
              ...input,
              result,
            }
          }
          default:
            throw casesExhausted(input)
        }
      },
    },
    unpack: async ({ input }) => {
      switch (input.transportType) {
        case `http`: {
          // todo 1 if response is missing header of content length then .json() hangs forever.
          //        firstly consider a timeout, secondly, if response is malformed, then don't even run .json()
          // todo 2 if response is e.g. 404 with no json body, then an error is thrown because json parse cannot work, not gracefully handled here
          const json = await input.response.json() as object
          const result = parseExecutionResult(json)
          return {
            ...input,
            result,
          }
        }
        case `memory`: {
          return {
            ...input,
            result: input.result,
          }
        }
        default:
          throw casesExhausted(input)
      }
    },
    decode: ({ input }) => {
      const result = input.transportType === `http`
        ? {
          ...input.result,
          response: input.response,
        }
        : input.result

      return result
    },
  },
  // todo expose return handling as part of the pipeline?
  // would be nice but alone would not yield type safe return handling
  // still, while figuring the type story out, might be a useful escape hatch for some cases...
})

export type Core<$Config extends Config = Config> = Anyware.Core<
  HookSequence,
  HookMap<$Config>,
  GraffleExecutionResultVar<$Config>
>

const isAbortError = (error: any): error is DOMException & { name: 'AbortError' } => {
  return (error instanceof DOMException && error.name === `AbortError`)
    // Under test with JSDOM, the error must be checked this way.
    // todo look for an open issue with JSDOM to link here, is this just artifact of JSDOM or is it a real issue that happens in browsers?
    || (error instanceof Error && error.message.startsWith(`AbortError:`))
}
