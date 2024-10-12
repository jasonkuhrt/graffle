import type { Fluent } from '../../../lib/fluent/__.js'
import type { Grafaid } from '../../../lib/grafaid/__.js'
import { getOperationType } from '../../../lib/grafaid/document.js'
import { operationTypeToRootType } from '../../../lib/grafaid/graphql.js'
import {
  isTemplateStringArguments,
  joinTemplateStringArrayAndArgs,
  type TemplateStringsArguments,
} from '../../../lib/template-string.js'
import { RequestCore } from '../../5_request/__.js'
import type { InterfaceRaw } from '../../5_request/types.js'
import { defineTerminus } from '../fluent.js'
import { handleOutput } from '../handleOutput.js'
import type { Config } from '../Settings/Config.js'
import { type DocumentController, resolveSendArguments, type sendArgumentsImplementation } from './send.js'

// dprint-ignore
export interface gql<$Config extends Config = Config> {
  <$Document extends Grafaid.Document.Typed.TypedDocumentLike>(document: $Document                            ): DocumentController<$Config, $Document>
  <$Document extends Grafaid.Document.Typed.TypedDocumentLike>(parts: TemplateStringsArray, ...args: unknown[]): DocumentController<$Config, $Document>
}

type gqlArguments = [Grafaid.Document.Typed.TypedDocumentLike] | TemplateStringsArguments

const resolveGqlArguments = (args: gqlArguments) => {
  const document = isTemplateStringArguments(args) ? joinTemplateStringArrayAndArgs(args) : args[0]
  return {
    document,
  }
}

export interface FnGql extends Fluent.FnProperty<'gql'> {
  // @ts-expect-error untyped params
  return: gql<this['params']>
}

export const gqlProperties = defineTerminus((state) => {
  return {
    gql: (...args: gqlArguments) => {
      const { document: query } = resolveGqlArguments(args)
      const interfaceType: InterfaceRaw = `raw`
      const transportType = state.config.transport.type
      const url = state.config.transport.type === `http` ? state.config.transport.url : undefined
      const schema = state.config.transport.type === `http` ? undefined : state.config.transport.schema

      return {
        send: async (...args: sendArgumentsImplementation) => {
          const { operationName, variables } = resolveSendArguments(args)
          const request = {
            query,
            variables,
            operationName,
          }
          const operationType = getOperationType(request)
          if (!operationType) throw new Error(`Could not get operation type`)

          const analyzedRequest = {
            rootType: operationTypeToRootType[operationType],
            operation: operationType,
            query,
            variables,
            operationName,
          }

          const initialInput = {
            interfaceType,
            transportType,
            state,
            url,
            schema,
            // request,
            request: analyzedRequest,
          } as RequestCore.Hooks.HookDefEncode<Config>['input']

          const result = await RequestCore.anyware.run({
            initialInput,
            retryingExtension: state.retry as any,
            extensions: state.extensions.filter(_ => _.onRequest !== undefined).map(_ => _.onRequest!) as any,
          })

          return handleOutput(state, analyzedRequest.rootType, result)
        },
      } as any
    },
  }
})
