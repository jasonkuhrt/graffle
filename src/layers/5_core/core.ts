import { type ExecutionResult, print } from 'graphql'
import { Anyware } from '../../lib/anyware/__.js'
import {
  OperationTypeAccessTypeMap,
  parseGraphQLOperationType,
  type StandardScalarVariables,
} from '../../lib/graphql-plus/graphql.js'
import {
  getRequestEncodeSearchParameters,
  getRequestHeadersRec,
  parseExecutionResult,
  postRequestEncodeBody,
  postRequestHeadersRec,
} from '../../lib/graphqlHTTP.js'
import { mergeRequestInit, searchParamsAppendAll } from '../../lib/http.js'
import { casesExhausted, getOptionalNullablePropertyOrThrow, throwNull } from '../../lib/prelude.js'
import { execute } from '../0_functions/execute.js'
import type { Schema } from '../1_Schema/__.js'
import { SelectionSet } from '../2_SelectionSet/__.js'
import { ResultSet } from '../3_ResultSet/__.js'
import type { GraffleExecutionResultVar } from '../6_client/client.js'
import type { Config } from '../6_client/Settings/Config.js'
import {
  type CoreExchangeGetRequest,
  type CoreExchangePostRequest,
  MethodMode,
  type MethodModeGetReads,
} from '../6_client/transportHttp/request.js'
import { type HookMap, hookNamesOrderedBySequence, type HookSequence } from './hooks.js'

const injectTypenameOnResultFields = (
  input: {
    operationName: string | undefined
    schema: Schema.Index
    document: SelectionSet.Nodes.Document.DocumentNormalized
  },
): SelectionSet.Nodes.Document.DocumentNormalized => {
  const { document, operationName, schema } = input
  const operation = operationName ? document.operations[operationName] : Object.values(document.operations)[0]!
  if (!operation) {
    throw new Error(`Operation not found`)
  }

  injectTypenameOnResultFields_({
    operation,
    schema,
  })

  return document
}

const injectTypenameOnResultFields_ = (
  input: {
    schema: Schema.Index
    operation: SelectionSet.Nodes.Document.OperationNormalized
  },
): void => {
  const { operation, schema } = input

  for (const [rootFieldName, fieldValue] of Object.entries(operation.selectionSet)) {
    const isResultField = Boolean(schema.error.rootResultFields[operation.rootType][rootFieldName])
    if (!isResultField) continue

    const field = SelectionSet.Nodes.parseSelection(rootFieldName, fieldValue)

    // todo test case for following todo
    // todo: handle inline fragments on the root type

    switch (field.type) {
      case `SelectionSet`: {
        field.selectionSet[`__typename`] = true
        continue
      }
      case `Alias`: {
        field.aliases.map(alias => {
          // todo test case for following todo
          // todo: handle inline fragments within the alias selection set
          const selectionSet = alias[1] as SelectionSet.Nodes.SelectionSet.AnySelectionSet
          selectionSet[`__typename`] = true
        })
        break
      }
      default: {
        throw new Error(`Unsupported selection set select type for a root field: ${field.type}`)
      }
    }
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
      let document: string
      let variables: StandardScalarVariables | undefined = undefined

      switch (input.interface) {
        case `raw`: {
          const documentPrinted = typeof input.document === `string`
            ? input.document
            : print(input.document)
          document = documentPrinted
          variables = input.variables
          break
        }
        case `typed`: {
          // todo turn inputs into variables
          variables = undefined
          document = print(SelectionSet.toGraphQLDocument(
            {
              schema: input.context.schemaIndex,
              captures: { customScalarOutputs: [], variables: [] },
            },
            [],
            input.context.config.output.errors.schema
              ? injectTypenameOnResultFields({
                operationName: input.operationName,
                schema: input.context.schemaIndex,
                document: input.document,
              })
              : input.document,
          ))
          break
        }
        default:
          throw casesExhausted(input)
      }

      switch (input.transport) {
        case `http`: {
          return {
            ...input,
            url: input.schema,
            query: document,
            variables,
          }
        }
        case `memory`: {
          return {
            ...input,
            schema: input.schema,
            query: document,
            variables,
          }
        }
      }
    },
    pack: {
      slots: {
        searchParams: getRequestEncodeSearchParameters,
        body: postRequestEncodeBody,
      },
      run: ({ input, slots }) => {
        // TODO thrown error here is swallowed in examples.
        switch (input.transport) {
          case `memory`: {
            return input
          }
          case `http`: {
            const methodMode = input.context.config.transport.config.methodMode
            // todo parsing here can be optimized.
            //      1. If using TS interface then work with initially submitted structured data to already know the operation type
            //      2. Maybe: Memoize over request.{ operationName, query }
            //      3. Maybe: Keep a cache of parsed request.{ query }
            const operationType = throwNull(parseGraphQLOperationType(input)) // todo better feedback here than throwNull
            const requestMethod = methodMode === MethodMode.post
              ? `post`
              : methodMode === MethodMode.getReads // eslint-disable-line
              ? OperationTypeAccessTypeMap[operationType] === `read` ? `get` : `post`
              : casesExhausted(methodMode)

            const baseProperties = mergeRequestInit(
              mergeRequestInit(
                mergeRequestInit(
                  {
                    headers: requestMethod === `get` ? getRequestHeadersRec : postRequestHeadersRec,
                  },
                  {
                    headers: input.context.config.transport.config.headers,
                    signal: input.context.config.transport.config.signal,
                  },
                ),
                input.context.config.transport.config.raw,
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
                url: searchParamsAppendAll(input.url, slots.searchParams(input)),
              }
              : {
                methodMode: methodMode,
                ...baseProperties,
                method: `post`,
                url: input.url,
                body: slots.body({
                  query: input.query,
                  variables: input.variables,
                  operationName: input.operationName,
                }),
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
        switch (input.transport) {
          case `http`: {
            const request = new Request(input.request.url, input.request)
            const response = await slots.fetch(request)
            return {
              ...input,
              response,
            }
          }
          case `memory`: {
            const result = await execute({
              schema: input.schema,
              document: input.query,
              variables: input.variables,
              operationName: input.operationName,
            })
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
      switch (input.transport) {
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
      switch (input.interface) {
        // todo this depends on the return mode
        case `raw`: {
          switch (input.transport) {
            case `http`: {
              return {
                ...input.result,
                response: input.response,
              }
            }
            case `memory`: {
              return input.result
            }
            default:
              throw casesExhausted(input)
          }
        }
        case `typed`: {
          const operation = SelectionSet.Document.getOperationOrThrow(input.document, input.operationName)
          // todo optimize
          // 1. Generate a map of possible custom scalar paths (tree structure)
          // 2. When traversing the result, skip keys that are not in the map
          // console.log(input.context.schemaIndex.Root)
          // console.log(getOptionalNullablePropertyOrThrow(input.context.schemaIndex.Root, operation.rootType))
          const dataDecoded = ResultSet.decode(
            getOptionalNullablePropertyOrThrow(input.context.schemaIndex.Root, operation.rootType),
            operation.selectionSet,
            input.result.data,
          )
          switch (input.transport) {
            case `memory`: {
              return { ...input.result, data: dataDecoded }
            }
            case `http`: {
              return { ...input.result, data: dataDecoded, response: input.response }
            }
            default:
              throw casesExhausted(input)
          }
        }
        default:
          throw casesExhausted(input)
      }
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
