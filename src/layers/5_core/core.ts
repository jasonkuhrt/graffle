import type { DocumentNode, ExecutionResult, GraphQLSchema } from 'graphql'
import { print } from 'graphql'
import { Anyware } from '../../lib/anyware/__.js'
import { type StandardScalarVariables } from '../../lib/graphql.js'
import { parseExecutionResult } from '../../lib/graphqlHTTP.js'
import { CONTENT_TYPE_GQL, CONTENT_TYPE_JSON, mergeHeadersInit } from '../../lib/http.js'
import { casesExhausted } from '../../lib/prelude.js'
import { execute } from '../0_functions/execute.js'
import type { Schema } from '../1_Schema/__.js'
import { SelectionSet } from '../3_SelectionSet/__.js'
import type { GraphQLObjectSelection } from '../3_SelectionSet/encode.js'
import * as Result from '../4_ResultSet/customScalars.js'
import type {
  ContextInterfaceRaw,
  ContextInterfaceTyped,
  InterfaceRaw,
  InterfaceTyped,
  TransportHttp,
  TransportMemory,
} from './types.js'

const getRootIndexOrThrow = (context: ContextInterfaceTyped, rootTypeName: string) => {
  // @ts-expect-error
  // eslint-disable-next-line
  const rootIndex = context.schemaIndex.Root[rootTypeName]
  if (!rootIndex) throw new Error(`Root type not found: ${rootTypeName}`)
  return rootIndex
}

// eslint-disable-next-line
type InterfaceInput<TypedProperties = {}, RawProperties = {}> =
  | ({
    interface: InterfaceTyped
    context: ContextInterfaceTyped
    rootTypeName: Schema.RootTypeName
  } & TypedProperties)
  | ({
    interface: InterfaceRaw
    context: ContextInterfaceRaw
  } & RawProperties)

// eslint-disable-next-line
type TransportInput<HttpProperties = {}, MemoryProperties = {}> =
  | ({
    transport: TransportHttp
    transportConstructorConfig: {
      headers?: HeadersInit
    }
  } & HttpProperties)
  | ({
    transport: TransportMemory
  } & MemoryProperties)

export const hookNamesOrderedBySequence = [`encode`, `pack`, `exchange`, `unpack`, `decode`] as const

export type HookSequence = typeof hookNamesOrderedBySequence

export type HookDefEncode = {
  input:
    & InterfaceInput<
      { selection: GraphQLObjectSelection },
      { document: string | DocumentNode; variables?: StandardScalarVariables; operationName?: string }
    >
    & TransportInput<{ schema: string | URL }, { schema: GraphQLSchema }>
  slots: {
    /**
     * Create the value that will be used as the HTTP body for the sent GraphQL request.
     */
    body: (
      input: { query: string; variables?: StandardScalarVariables; operationName?: string },
    ) => BodyInit
  }
}

export type HookDefPack = {
  input:
    & InterfaceInput
    & TransportInput<
      { url: string | URL; headers?: HeadersInit; body: BodyInit },
      {
        schema: GraphQLSchema
        query: string
        variables?: StandardScalarVariables
        operationName?: string
      }
    >
}

type RequestInput = {
  url: string | URL
  method:
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'patch'
    | 'head'
    | 'options'
    | 'trace'
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'HEAD'
    | 'OPTIONS'
    | 'TRACE'
  headers?: HeadersInit
  body: BodyInit
}

export type HookDefExchange = {
  slots: {
    fetch: typeof fetch
  }
  input:
    & InterfaceInput
    & TransportInput<
      {
        request: RequestInput
      },
      {
        schema: GraphQLSchema
        query: string | DocumentNode
        variables?: StandardScalarVariables
        operationName?: string
      }
    >
}

export type HookDefUnpack = {
  input:
    & InterfaceInput
    & TransportInput<
      { response: Response },
      {
        result: ExecutionResult
      }
    >
}

export type HookDefDecode = {
  input:
    & { result: ExecutionResult }
    & InterfaceInput
    & TransportInput<
      { response: Response }
    >
}

export type HookMap = {
  encode: HookDefEncode
  pack: HookDefPack
  exchange: HookDefExchange
  unpack: HookDefUnpack
  decode: HookDefDecode
}

export const anyware = Anyware.create<HookSequence, HookMap, ExecutionResult>({
  hookNamesOrderedBySequence,
  hooks: {
    encode: {
      slots: {
        body: (input) => {
          return JSON.stringify({
            query: input.query,
            variables: input.variables,
            operationName: input.operationName,
          })
        },
      },
      run: ({ input, slots }) => {
        let document: string
        let variables: StandardScalarVariables | undefined = undefined
        let operationName: string | undefined = undefined

        switch (input.interface) {
          case `raw`: {
            const documentPrinted = typeof input.document === `string`
              ? input.document
              : print(input.document)
            document = documentPrinted
            variables = input.variables
            operationName = input.operationName
            break
          }
          case `typed`: {
            // todo turn inputs into variables
            variables = undefined
            document = SelectionSet.Print.rootTypeSelectionSet(
              input.context,
              getRootIndexOrThrow(input.context, input.rootTypeName),
              input.selection,
            )
            break
          }
          default:
            throw casesExhausted(input)
        }

        switch (input.transport) {
          case `http`: {
            const body = slots.body({
              query: document,
              variables,
              operationName,
            })

            return {
              ...input,
              url: input.schema,
              body,
            }
          }
          case `memory`: {
            return {
              ...input,
              schema: input.schema,
              query: document,
              variables,
              operationName,
            }
          }
        }
      },
    },
    pack: ({ input }) => {
      switch (input.transport) {
        case `memory`: {
          return input
        }
        case `http`: {
          const headers = new Headers(input.headers)
          // @see https://graphql.github.io/graphql-over-http/draft/#sec-Accept
          headers.set(`accept`, CONTENT_TYPE_GQL)
          // @see https://graphql.github.io/graphql-over-http/draft/#sec-POST
          // todo if body is something else, say upload extension turns it into a FormData, then fetch will automatically set the content-type header.
          // ... however we should not rely on that behavior, and instead error here if there is no content type header and we cannot infer it here?
          if (typeof input.body === `string`) {
            headers.set(`content-type`, CONTENT_TYPE_JSON)
          }
          return {
            ...input,
            request: {
              url: input.url,
              body: input.body,
              method: `POST`,
              headers,
            },
          }
        }
        default:
          throw casesExhausted(input)
      }
    },
    exchange: {
      slots: {
        fetch: (request) => {
          return fetch(request)
        },
      },
      run: async ({ input, slots }) => {
        switch (input.transport) {
          case `http`: {
            const headers = mergeHeadersInit(
              input.transportConstructorConfig.headers ?? {},
              input.request.headers ?? {},
            )
            const response = await slots.fetch(
              new Request(input.request.url, {
                method: input.request.method,
                headers,
                body: input.request.body,
              }),
            )
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
          // todo 1 firstly consider a timeout, secondly, if response is malformed, then don't even run .json()
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
          // todo optimize
          // 1. Generate a map of possible custom scalar paths (tree structure)
          // 2. When traversing the result, skip keys that are not in the map
          const dataDecoded = Result.decode(getRootIndexOrThrow(input.context, input.rootTypeName), input.result.data)
          // console.log(8, Object.keys({ ...input.result, data: dataDecoded }))
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

export type Core = (typeof anyware)['core']
