import type { DocumentNode, ExecutionResult, GraphQLSchema } from 'graphql'
import { print } from 'graphql'
import { Anyware } from '../../lib/anyware/__.js'
import { type StandardScalarVariables } from '../../lib/graphql.js'
import { parseExecutionResult } from '../../lib/graphqlHTTP.js'
import { CONTENT_TYPE_GQL } from '../../lib/http.js'
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
type InterfaceInput<A = {}, B = {}> =
  | ({
    interface: InterfaceTyped
    context: ContextInterfaceTyped
    rootTypeName: Schema.RootTypeName
  } & A)
  | ({
    interface: InterfaceRaw
    context: ContextInterfaceRaw
  } & B)

// eslint-disable-next-line
type TransportInput<A = {}, B = {}> =
  | ({
    transport: TransportHttp
  } & A)
  | ({
    transport: TransportMemory
  } & B)

export const hookNamesOrderedBySequence = [`encode`, `pack`, `exchange`, `unpack`, `decode`] as const

export type HookSequence = typeof hookNamesOrderedBySequence

export type HookDefEncode = {
  input:
    & InterfaceInput<
      { selection: GraphQLObjectSelection },
      { document: string | DocumentNode; variables?: StandardScalarVariables }
    >
    & TransportInput<{ schema: string | URL }, { schema: GraphQLSchema }>
  slots: {
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
            return {
              ...input,
              url: input.schema,
              body: slots.body({
                query: document,
                variables,
                operationName: `todo`,
              }),
            }
          }
          case `memory`: {
            return {
              ...input,
              schema: input.schema,
              query: document,
              variables,
              // operationName: '',
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
          headers.append(`accept`, CONTENT_TYPE_GQL)
          return {
            ...input,
            request: {
              url: input.url,
              body: input.body, // JSON.stringify({ query, variables, operationName }),
              method: `POST`,
              headers,
            },
          }
        }
        default:
          throw casesExhausted(input)
      }
    },
    exchange: async ({ input }) => {
      switch (input.transport) {
        case `http`: {
          const response = await fetch(
            new Request(input.request.url, {
              method: input.request.method,
              headers: input.request.headers,
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
    unpack: async ({ input }) => {
      switch (input.transport) {
        case `http`: {
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
          return input.result
        }
        case `typed`: {
          // todo optimize
          // 1. Generate a map of possible custom scalar paths (tree structure)
          // 2. When traversing the result, skip keys that are not in the map
          const dataDecoded = Result.decode(getRootIndexOrThrow(input.context, input.rootTypeName), input.result.data)
          return { ...input.result, data: dataDecoded }
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
