import type { Fluent } from '../../../lib/fluent/__.js'
import type { TypedDocument } from '../../../lib/typed-document/__.js'
import { RequestCore } from '../../5_request/__.js'
import type { InterfaceRaw } from '../../5_request/types.js'
import { defineTerminus } from '../fluent.js'
import { handleOutput } from '../handleOutput.js'
import type { Config } from '../Settings/Config.js'
import { type DocumentController, resolveSendArguments, type sendArgumentsImplementation } from './send.js'

// dprint-ignore
export interface gql<$Config extends Config = Config> {
  <$Document extends TypedDocument.TypedDocument>(document: $Document): DocumentController<$Config, $Document>
  <$Document extends TypedDocument.TypedDocument>(parts: TemplateStringsArray, ...args: unknown[]): DocumentController<$Config, $Document>
}

type TemplateStringsArguments = [TemplateStringsArray, ...unknown[]]

type gqlArguments = [TypedDocument.TypedDocument] | TemplateStringsArguments

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
      const { document } = resolveGqlArguments(args)

      return {
        send: async (...args: sendArgumentsImplementation) => {
          const { operationName, variables } = resolveSendArguments(args)
          const interfaceType: InterfaceRaw = `raw`
          const transportType = state.config.transport.type
          const url = state.config.transport.type === `http` ? state.config.transport.url : undefined
          const schema = state.config.transport.type === `http` ? undefined : state.config.transport.schema
          const initialInput = {
            interfaceType,
            transportType,
            state,
            url,
            schema,
            schemaIndex: state.config.schemaIndex,
            request: {
              query: document,
              variables,
              operationName,
            },
          } as RequestCore.Hooks.HookDefEncode<Config>['input']
          const result = await RequestCore.anyware.run({
            initialInput,
            retryingExtension: state.retry as any,
            extensions: state.extensions.filter(_ => _.onRequest !== undefined).map(_ => _.onRequest!) as any,
          })
          return handleOutput(state, result)
        },
      } as any
    },
  }
})

const isTemplateStringArguments = (args: [...unknown[]]): args is TemplateStringsArguments => {
  return isTemplateStringArray(args[0])
}

const isTemplateStringArray = (arg: any): arg is TemplateStringsArray => {
  return Array.isArray(arg) && `raw` in arg && arg.raw !== undefined
}

const joinTemplateStringArrayAndArgs = (args: TemplateStringsArguments): string => {
  const [templateParts, ...templateArgs] = args
  return templateParts.reduce(
    (string, part, index) => `${string}${part}${index in templateArgs ? String(templateArgs[index]) : ``}`,
    ``,
  )
}
