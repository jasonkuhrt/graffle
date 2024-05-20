import type { DocumentNode, ExecutionResult, GraphQLSchema } from 'graphql'
import { print } from 'graphql'
import type { Core } from '../../lib/anyware/main.js'
import type { StandardScalarVariables } from '../../lib/graphql.js'
import { parseExecutionResult } from '../../lib/graphqlHTTP.js'
import { CONTENT_TYPE_GQL } from '../../lib/http.js'
import { casesExhausted } from '../../lib/prelude.js'
import { execute } from '../0_functions/execute.js'
import type { Schema } from '../1_Schema/__.js'
import { SelectionSet } from '../3_SelectionSet/__.js'
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
  const rootIndex = context.schemaIndex.Root[rootTypeName]
  if (!rootIndex) throw new Error(`Root type not found: ${rootTypeName}`)
  return rootIndex
}

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

type TransportInput<A = {}, B = {}> =
  | ({
    transport: TransportHttp
  } & A)
  | ({
    transport: TransportMemory
  } & B)

export const createCore = (): Core<[`encode`, `pack`, `exchange`, `unpack`, `decode`], {
  encode:
    & InterfaceInput<{}, { document: string | DocumentNode }>
    & TransportInput<{ schema: string | URL }, { schema: GraphQLSchema }>
  pack:
    & {
      document: string | DocumentNode
      variables: StandardScalarVariables
      operationName?: string
    }
    & InterfaceInput
    & TransportInput<{ url: string | URL; headers?: HeadersInit }, { schema: GraphQLSchema }>
  exchange:
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
  unpack:
    & InterfaceInput
    & TransportInput<
      { response: Response },
      {
        result: ExecutionResult
      }
    >
  decode:
    & { result: ExecutionResult }
    & InterfaceInput
  // todo this depends on the return mode
}, ExecutionResult> => {
  return {
    hookNamesOrderedBySequence: [`encode`, `pack`, `exchange`, `unpack`, `decode`],
    implementationsByHook: {
      encode: (
        input,
      ) => {
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
              // @ts-expect-error fixme
              selection[rootTypeNameToOperationName[input.rootTypeName]],
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
  }
}
