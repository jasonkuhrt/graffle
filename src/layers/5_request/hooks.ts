import type { ExecutionResult, GraphQLSchema } from 'graphql'
import type { GraphQLHTTP } from '../../lib/graphql-http/__.js'
import type { getRequestEncodeSearchParameters, postRequestEncodeBody } from '../../lib/graphql-http/graphqlHTTP.js'
import type { GraphQLRequestInput } from '../../lib/graphql-plus/graphql.js'
import type { httpMethodGet, httpMethodPost } from '../../lib/http.js'
import type { Select } from '../2_Select/__.js'
import type { SchemaIndex } from '../4_generator/generators/SchemaIndex.js'
import type { State } from '../6_client/fluent.js'
import type { Config } from '../6_client/Settings/Config.js'
import type { MethodModeGetReads, MethodModePost } from '../6_client/transportHttp/request.js'
import type { InterfaceRaw, InterfaceTyped, TransportHttp, TransportMemory } from './types.js'

interface HookInputBase {
  schemaIndex: SchemaIndex | null
  state: State
  // todo remove these
  document?: Select.Document.DocumentNormalized
  operationName?: string
}

type InterfaceInput<TypedProperties = {}, RawProperties = {}> =
  | ({
    interfaceType: InterfaceTyped
  } & TypedProperties)
  | ({
    interfaceType: InterfaceRaw
  } & RawProperties)

// dprint-ignore

type TransportInput<$Config extends Config, $HttpProperties = {}, $MemoryProperties = {}> =
  | (
      TransportHttp extends $Config['transport']['type']
        ? ({
            transportType: TransportHttp
            url: string | URL
          } & $HttpProperties)
        : never
    )
  | (
      TransportMemory extends $Config['transport']['type']
        ? ({
          transportType: TransportMemory
          schema: GraphQLSchema
        } & $MemoryProperties)
        : never
    )

export type HookDefEncode<$Config extends Config> = {
  input:
    & HookInputBase
    & InterfaceInput<
      { request: { document: Select.Document.DocumentNormalized; operationName?: string } },
      { request: GraphQLRequestInput }
    >
    & TransportInput<$Config>
}

export type HookDefPack<$Config extends Config> = {
  input:
    & HookInputBase
    & InterfaceInput
    & TransportInput<
      $Config,
      // todo why is headers here but not other http request properties?
      { headers?: HeadersInit }
    >
    & { request: GraphQLHTTP.RequestInput }
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
    & HookInputBase
    & InterfaceInput
    & TransportInput<
      $Config,
      { request: CoreExchangePostRequest | CoreExchangeGetRequest },
      { request: GraphQLHTTP.RequestInput }
    >
}

export type HookDefUnpack<$Config extends Config> = {
  input:
    & HookInputBase
    & InterfaceInput
    & TransportInput<
      $Config,
      { response: Response },
      { result: ExecutionResult }
    >
}

export type HookDefDecode<$Config extends Config> = {
  input:
    & HookInputBase
    & InterfaceInput
    & TransportInput<
      $Config,
      { response: Response }
    >
    & { result: ExecutionResult }
}

export type HookMap<$Config extends Config = Config> = {
  encode: HookDefEncode<$Config>
  pack: HookDefPack<$Config>
  exchange: HookDefExchange<$Config>
  unpack: HookDefUnpack<$Config>
  decode: HookDefDecode<$Config>
}

export const hookNamesOrderedBySequence = [`encode`, `pack`, `exchange`, `unpack`, `decode`] as const

export type HookSequence = typeof hookNamesOrderedBySequence

/**
 * An extension of {@link RequestInit} that adds a required `url` property and makes `body` required.
 */
export type CoreExchangePostRequest = Omit<RequestInit, 'body' | 'method'> & {
  methodMode: MethodModePost | MethodModeGetReads
  method: httpMethodPost
  url: string | URL // todo URL for config and string only for input. Requires anyware to allow different types for input and existing config.
  body: BodyInit
}

export type CoreExchangeGetRequest = Omit<RequestInit, 'body' | 'method'> & {
  methodMode: MethodModeGetReads
  method: httpMethodGet
  url: string | URL
}
