import type { DocumentNode, ExecutionResult, GraphQLSchema } from 'graphql'
import type { GraphQLRequestEncoded, GraphQLRequestInput, StandardScalarVariables } from '../../lib/graphql.js'
import type { getRequestEncodeSearchParameters, postRequestEncodeBody } from '../../lib/graphqlHTTP.js'
import type { Document } from '../4_document/__.js'
import type { InterfaceTypedRequestContext, RequestContext } from '../6_client/client.js'
import type { Config } from '../6_client/Settings/Config.js'
import type { CoreExchangeGetRequest, CoreExchangePostRequest } from '../6_client/transportHttp/request.js'
import type { InterfaceRaw, InterfaceTyped, TransportHttp, TransportMemory } from './types.js'

type InterfaceInput<TypedProperties = {}, RawProperties = {}> =
  | ({
    interface: InterfaceTyped
    context: InterfaceTypedRequestContext
    document: Document.DocumentNormalized
    operationName?: string
  } & TypedProperties)
  | ({
    interface: InterfaceRaw
    context: RequestContext
  } & RawProperties)

// dprint-ignore

type TransportInput<$Config extends Config, $HttpProperties = {}, $MemoryProperties = {}> =
  | (
      TransportHttp extends $Config['transport']['type']
        ? ({
            transport: TransportHttp
            
          } & $HttpProperties)
        : never
    )
  | (
      TransportMemory extends $Config['transport']['type']
        ? ({
          transport: TransportMemory
        } & $MemoryProperties)
        : never
    )

export const hookNamesOrderedBySequence = [`encode`, `pack`, `exchange`, `unpack`, `decode`] as const

export type HookSequence = typeof hookNamesOrderedBySequence

export type HookDefEncode<$Config extends Config> = {
  input:
    & InterfaceInput<{ operationName?: string }, GraphQLRequestInput>
    & TransportInput<$Config, { schema: string | URL }, { schema: GraphQLSchema }>
}

export type HookDefPack<$Config extends Config> = {
  input:
    & GraphQLRequestEncoded
    & InterfaceInput
    // todo why is headers here but not other http request properties?
    & TransportInput<$Config, { url: string | URL; headers?: HeadersInit }, {
      schema: GraphQLSchema
    }>
  slots: {
    /**
     * When request will be sent using GET this slot is called to create the value that will be used for the HTTP Search Parameters.
     */
    searchParams: getRequestEncodeSearchParameters
    /**
     * When request will be sent using POST this slot is called to create the value that will be used for the HTTP body.
     */
    body: postRequestEncodeBody
  }
}

export type HookDefExchange<$Config extends Config> = {
  slots: {
    fetch: (request: Request) => Response | Promise<Response>
  }
  input:
    & InterfaceInput
    & TransportInput<$Config, {
      request: CoreExchangePostRequest | CoreExchangeGetRequest
    }, {
      schema: GraphQLSchema
      query: string | DocumentNode
      variables?: StandardScalarVariables
      operationName?: string
    }>
}

export type HookDefUnpack<$Config extends Config> = {
  input:
    & InterfaceInput
    & TransportInput<$Config, { response: Response }, {
      result: ExecutionResult
    }>
}

export type HookDefDecode<$Config extends Config> = {
  input:
    & { result: ExecutionResult }
    & InterfaceInput
    & TransportInput<$Config, { response: Response }>
}

export type HookMap<$Config extends Config = Config> = {
  encode: HookDefEncode<$Config>
  pack: HookDefPack<$Config>
  exchange: HookDefExchange<$Config>
  unpack: HookDefUnpack<$Config>
  decode: HookDefDecode<$Config>
}
