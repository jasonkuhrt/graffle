import { context } from '@opentelemetry/api'
import { GraphQLSchema, parse } from 'graphql'
import { run } from '../../../lib/anyware/specHelpers.js'
import type { Fluent } from '../../../lib/fluent/__.js'
import type { TypedDocument } from '../../../lib/typed-document/__.js'
import { Core } from '../../5_core/__.js'
import type { InterfaceRaw } from '../../5_core/types.js'
import { defineProperties } from '../fluent.js'
import { handleOutput } from '../handleOutput.js'
import type { Config } from '../Settings/Config.js'
import { inputToConfig } from '../Settings/InputToConfig.js'
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

export const gqlProperties = defineProperties((builder, state) => {
  return {
    gql: (...args: gqlArguments) => {
      const { document } = resolveGqlArguments(args)

      return {
        send: async (...args: sendArgumentsImplementation) => {
          const { operationName, variables } = resolveSendArguments(args)
          const interface_: InterfaceRaw = `raw`
          const transport = state.input.schema instanceof GraphQLSchema ? `memory` : `http`
          const initialInput: Core.Hooks.HookDefEncode<Config>['input'] = {
            interface: interface_,
            transport,
            document,
            schema: state.input.schema,
            variables,
            operationName,
            context: {
              config: inputToConfig(state.input),
              state,
              schemaIndex: state.input.schemaIndex ?? null,
            },
          }
          const result = await Core.anyware.run({
            initialInput,
            retryingExtension: state.retry as any,
            extensions: state.extensions.filter(_ => _.onRequest !== undefined).map(_ => _.onRequest!) as any,
          })
          return handleOutput(initialInput.context, result)
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
