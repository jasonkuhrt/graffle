import { isString } from 'es-toolkit'
import type { Fluent } from '../../../lib/fluent/__.js'
import type { TypedDocument } from '../../../lib/typed-document/__.js'
import type { Config } from '../Settings/Config.js'
import { type DocumentController, resolveSendArguments, type sendArgumentsImplementation } from './send.js'

// dprint-ignore
export interface gql<$Config extends Config = Config> {
  <$Document extends TypedDocument.TypedDocument>(document: $Document): DocumentController<$Config, $Document>
  <$Document extends TypedDocument.TypedDocument>(parts: TemplateStringsArray, ...args: unknown[]): DocumentController<$Config, $Document>
}

type gqlArguments = [TypedDocument.TypedDocument] | [TemplateStringsArray, ...unknown[]]

const resolveGqlArguments = (args: gqlArguments) => {
  const document = args[0]
  const operationName = isString(args[0]) ? args[0] : undefined
  const variables = isString(args[0]) ? args[1] : args[0]
  return {
    document,
    operationName,
    variables,
  }
}

export interface FnGql extends Fluent.FnProperty<'gql'> {
  // @ts-expect-error untyped params
  return: gql<this['params']>
}

const gql: gql = (...args: gqlArguments) => {
  const { document, operationName, variables } = resolveGqlArguments(args)

  return {
    send: async (...args: sendArgumentsImplementation) => {
      const { operationName, variables } = resolveSendArguments(args)
      return await Promise.resolve({
        id: 1,
      })
    },
  } as any
}

// const isTemplateStringArray = (arg: any): arg is TemplateStringsArray => {
//   return Array.isArray(arg) && 'raw' in arg && arg.raw !== undefined
// }

// const joinTemplateStringArrayAndArgs = (templateParts: TemplateStringsArray, templateArgs: unknown[]): string => {
//   return templateParts.reduce(
//     (string, part, index) => `${string}${part}${index in templateArgs ? String(templateArgs[index]) : ``}`,
//     ``,
//   )
// }
