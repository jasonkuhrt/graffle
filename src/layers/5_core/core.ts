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

export type HookInputEncode =
  & InterfaceInput<{ selection: GraphQLObjectSelection }, { document: string | DocumentNode }>
  & TransportInput<{ schema: string | URL }, { schema: GraphQLSchema }>

export type HookInputPack =
  & {
    document: string | DocumentNode
    variables: StandardScalarVariables
    operationName?: string
  }
  & InterfaceInput
  & TransportInput<{ url: string | URL; headers?: HeadersInit }, { schema: GraphQLSchema }>

export type ExchangeInputHook =
  & InterfaceInput
  & TransportInput<
    { request: Request },
    {
      schema: GraphQLSchema
      document: string | DocumentNode
      variables: StandardScalarVariables
      operationName?: string
    }
  >

export type HookInputUnpack =
  & InterfaceInput
  & TransportInput<
    { response: Response },
    {
      result: ExecutionResult
    }
  >

export type HookInputDecode =
  & { result: ExecutionResult }
  & InterfaceInput

export type Hooks = {
  encode: HookInputEncode
  pack: HookInputPack
  exchange: ExchangeInputHook
  unpack: HookInputUnpack
  decode: HookInputDecode
}

export const anyware = Anyware.create<HookSequence, Hooks, ExecutionResult>({
  hookNamesOrderedBySequence,
  hooks: {
    encode: (
      input,
    ) => {
      // console.log(`encode:1`)
      let document: string | DocumentNode
      switch (input.interface) {
        case `raw`: {
          document = input.document
          break
        }
        case `typed`: {
          // todo turn inputs into variables
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

      // console.log(`encode:2`)
      switch (input.transport) {
        case `http`: {
          return {
            ...input,
            transport: input.transport,
            url: input.schema,
            document,
            variables: {},
            // operationName: '',
          }
        }
        case `memory`: {
          return {
            ...input,
            transport: input.transport,
            schema: input.schema,
            document,
            variables: {},
            // operationName: '',
          }
        }
      }
    },
    pack: (input) => {
      // console.log(`pack:1`)
      const documentPrinted = typeof input.document === `string`
        ? input.document
        : print(input.document)

      switch (input.transport) {
        case `http`: {
          const body = {
            query: documentPrinted,
            variables: input.variables,
            operationName: input.operationName,
          }

          const bodyEncoded = JSON.stringify(body)

          const requestConfig = new Request(input.url, {
            method: `POST`,
            headers: new Headers({
              'accept': CONTENT_TYPE_GQL,
              ...Object.fromEntries(new Headers(input.headers).entries()),
            }),
            body: bodyEncoded,
          })

          return {
            ...input,
            request: requestConfig,
          }
        }
        case `memory`: {
          return {
            ...input,
          }
        }
        default:
          throw casesExhausted(input)
      }
    },
    exchange: async (input) => {
      switch (input.transport) {
        case `http`: {
          const response = await fetch(input.request)
          return {
            ...input,
            response,
          }
        }
        case `memory`: {
          const result = await execute({
            schema: input.schema,
            document: input.document,
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
    unpack: async (input) => {
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
    decode: (input) => {
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
