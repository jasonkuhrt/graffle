import { RootTypeName } from '../../lib/graphql.js'
import { assertArray, assertObject, lowerCaseFirstLetter } from '../../lib/prelude.js'
import { Schema } from '../1_Schema/__.js'
import { readMaybeThunk } from '../1_Schema/core/helpers.js'
import type { ReturnModeType } from '../5_client/Config.js'
import type { SelectionSet } from './__.js'
import { isSelectFieldName } from './helpers.js'
import { parseClientDirectiveDefer } from './runtime/directives/defer.js'
import { toGraphQLDirective } from './runtime/directives/directive.js'
import { parseClientDirectiveInclude } from './runtime/directives/include.js'
import { parseClientDirectiveSkip } from './runtime/directives/skip.js'
import { parseClientDirectiveStream } from './runtime/directives/stream.js'
import { parseClientFieldItem } from './runtime/FieldItem.js'
import { parseClientFieldName, toGraphQLFieldName } from './runtime/FieldName.js'
import type { Indicator } from './runtime/indicator.js'
import { isIndicator, isPositiveIndicator } from './runtime/indicator.js'
import { parseClientOn, toGraphQLOn } from './runtime/on.js'

type SpecialFields = {
  // todo - this requires having the schema at runtime to know which fields to select.
  // $scalars?: SelectionSet.Indicator
  $include?: SelectionSet.Directive.Include['$include']
  $skip?: SelectionSet.Directive.Skip['$skip']
  $defer?: SelectionSet.Directive.Defer['$defer']
  $stream?: SelectionSet.Directive.Stream['$stream']
  $?: Args
}

type Args = { [k: string]: ArgValue }

type ArgValue = string | boolean | null | number | Args

export type DocumentObject = Record<string, GraphQLRootSelection>

export type GraphQLRootSelection = { query: GraphQLObjectSelection } | { mutation: GraphQLObjectSelection }

export type GraphQLObjectSelection = Record<string, Indicator | SS>

export type SS = {
  [k: string]: Indicator | SS
} & SpecialFields

type FieldValue = SS | Indicator

export interface Context {
  schemaIndex: Schema.Index
  config: {
    returnMode: ReturnModeType
    // typeHooks: {
    //   /**
    //    * Control encoding for custom scalars
    //    * found in inputs.
    //    */
    //   customScalar: (v: Schema.Scalar.Scalar) => Schema.Scalar.StandardScalarRuntimeTypes
    // }
  }
}

export const rootTypeSelectionSet = (
  context: Context,
  schemaObject: Schema.Object$2,
  ss: GraphQLObjectSelection,
  operationName: string = ``,
) => {
  const operationTypeName = lowerCaseFirstLetter(schemaObject.fields.__typename.type.type)
  return `${operationTypeName} ${operationName} { ${resolveObjectLikeFieldValue(context, schemaObject, ss)} }`
}

const resolveDirectives = (fieldValue: FieldValue) => {
  if (isIndicator(fieldValue)) return ``

  const { $include, $skip, $defer, $stream } = fieldValue

  let directives = ``

  if ($stream !== undefined) {
    directives += toGraphQLDirective(parseClientDirectiveStream($stream))
  }

  if ($defer !== undefined) {
    directives += toGraphQLDirective(parseClientDirectiveDefer($defer))
  }

  if ($include !== undefined) {
    directives += toGraphQLDirective(parseClientDirectiveInclude($include))
  }

  if ($skip !== undefined) {
    directives += toGraphQLDirective(parseClientDirectiveSkip($skip))
  }

  return directives
}

const resolveArgValue = (
  context: Context,
  schemaItemMaybeThunk: Schema.Input.Any,
  argValue: ArgValue,
): string => {
  if (argValue === null) return String(null) // todo could check if index agrees is nullable.

  const indexArg = readMaybeThunk(schemaItemMaybeThunk)

  switch (indexArg.kind) {
    case `nullable`:
      return resolveArgValue(context, indexArg.type, argValue)
    case `list`: {
      assertArray(argValue)
      const value = argValue.map(_ => resolveArgValue(context, indexArg.type, _ as ArgValue))
      return `[${value.join(`, `)}]`
    }
    case `InputObject`: {
      assertObject(argValue)
      const entries = Object.entries(argValue).map(([argName, argValue]) => {
        // @ts-expect-error fixme
        const indexArg = indexArgs.fields[argName] // eslint-disable-line
        if (!indexArg) throw new Error(`Arg not found: ${argName}`)
        return [argName, resolveArgValue(context, indexArg, argValue)]
      })
      return `{ ${entries.map(([k, v]) => `${k!}: ${v!}`).join(`, `)} }`
    }
    case `Enum`: {
      return String(argValue)
    }
    case `Scalar`: {
      // @ts-expect-error fixme
      return indexArg.codec.encode(argValue)
    }
    default:
      throw new Error(`Unsupported arg kind: ${JSON.stringify(indexArg)}`)
  }
}

const resolveArgs = (context: Context, schemaField: Schema.SomeField, ss: Indicator | SS) => {
  if (isIndicator(ss)) return ``

  const { $ } = ss
  if ($ === undefined) return ``

  const schemaArgs = schemaField.args
  if (!schemaArgs) throw new Error(`Field has no args`)

  const argEntries = Object.entries($)
  if (argEntries.length === 0) return ``

  return `(${
    argEntries.map(([argName, v]) => {
      const schemaArg = schemaArgs.fields[argName] as Schema.Input.Any | undefined // eslint-disable-line
      if (!schemaArg) throw new Error(`Arg ${argName} not found in schema field`)
      const valueEncoded = resolveArgValue(context, schemaArg, v)
      return `${argName}: ${valueEncoded}`
    }).join(`, `)
  })`
}
const pruneNonSelections = (ss: SS) => {
  const entries = Object.entries(ss)
  const selectEntries = entries.filter(_ => !_[0].startsWith(`$`))
  return Object.fromEntries(selectEntries)
}

const resolveFieldValue = (
  context: Context,
  schemaField: Schema.SomeField,
  fieldValue: null | FieldValue,
): string => {
  if (fieldValue === null) return `null` // todo test this case

  if (isIndicator(fieldValue)) return ``

  const entries = Object.entries(fieldValue)
  const directives = resolveDirectives(fieldValue)
  const args = resolveArgs(context, schemaField, fieldValue)
  const selects = entries.filter(_ => isSelectFieldName(_[0]))

  if (selects.length === 0) {
    return `${args} ${directives}`
  }

  const selection = Object.fromEntries(selects) as GraphQLObjectSelection

  // eslint-disable-next-line
  // @ts-ignore ID error
  const schemaNamedOutputType = Schema.Output.unwrapToNamed(schemaField.type) as Schema.Object$2
  return `${args} ${directives} {
		${resolveObjectLikeFieldValue(context, readMaybeThunk(schemaNamedOutputType), selection)}
	}`
}

export const resolveObjectLikeFieldValue = (
  context: Context,
  schemaItem: Schema.Object$2 | Schema.Union | Schema.Interface,
  fieldValue: FieldValue,
): string => {
  // todo optimize by doing single loop
  const applicableSelections = Object.entries(fieldValue).filter(([_, ss]) => isPositiveIndicator(ss)) as [
    string,
    FieldValue,
  ][]
  switch (schemaItem.kind) {
    case `Object`: {
      const rootTypeName = (RootTypeName as Record<string, RootTypeName>)[schemaItem.fields.__typename.type.type]
        ?? null
      return applicableSelections.map(([clientFieldName, ss]) => {
        const fieldName = parseClientFieldName(clientFieldName)
        const schemaField = schemaItem.fields[fieldName.actual]
        if (!schemaField) throw new Error(`Field ${clientFieldName} not found in schema object`)
        // dprint-ignore
        if (rootTypeName && context.config.returnMode === `successData` && context.schemaIndex.error.rootResultFields[rootTypeName][fieldName.actual]) {
          (ss as Record<string, boolean>)[`__typename`] = true
        }
        return `${toGraphQLFieldName(fieldName)} ${resolveFieldValue(context, schemaField, ss)}`
      }).join(`\n`) + `\n`
    }
    case `Interface`: {
      return applicableSelections.map(([ClientFieldName, ss]) => {
        const fieldItem = parseClientFieldItem(ClientFieldName)

        switch (fieldItem._tag) {
          case `FieldName`: {
            if (fieldItem.actual === `__typename`) {
              return `${toGraphQLFieldName(fieldItem)} ${resolveDirectives(ss)}`
            }
            const schemaField = schemaItem.fields[fieldItem.actual]
            if (!schemaField) throw new Error(`Field ${ClientFieldName} not found in schema object`)
            return `${toGraphQLFieldName(fieldItem)} ${resolveFieldValue(context, schemaField, ss)}`
          }
          case `On`: {
            const schemaObject = context.schemaIndex[`objects`][fieldItem.typeOrFragmentName]
            if (!schemaObject) throw new Error(`Fragment ${fieldItem.typeOrFragmentName} not found in schema`)
            return `${toGraphQLOn(fieldItem)} ${resolveDirectives(ss)} { ${
              resolveObjectLikeFieldValue(context, schemaObject, ss)
            } }`
          }
          default: {
            throw new Error(`Unknown field item tag`)
          }
        }
      }).join(`\n`) + `\n`
    }
    case `Union`: {
      return applicableSelections.map(([fieldExpression, ss]) => {
        const fieldItem = parseClientFieldItem(fieldExpression)
        switch (fieldItem._tag) {
          case `FieldName`: {
            if (fieldItem.actual === `__typename`) {
              return `${toGraphQLFieldName(fieldItem)} ${resolveDirectives(ss)}`
            }
            // todo
            throw new Error(`todo resolve common interface fields from unions`)
          }
          case `On`: {
            const schemaObject = context.schemaIndex[`objects`][fieldItem.typeOrFragmentName]
            if (!schemaObject) throw new Error(`Fragment ${fieldItem.typeOrFragmentName} not found in schema`)
            // if (isIndicator(ss)) throw new Error(`Union field must have selection set`)
            return `${toGraphQLOn(fieldItem)} ${resolveDirectives(ss)} { ${
              // @ts-expect-error fixme
              resolveObjectLikeFieldValue(context, schemaObject, pruneNonSelections(ss))} }`
          }
          default: {
            throw new Error(`Unknown field item tag`)
          }
        }
      }).join(`\n`) + `\n`
    }
    default:
      throw new Error(`Unknown schema item kind`)
  }
}

export const resolveOn = (field: string) => {
  const on = parseClientOn(field)
  if (on) return toGraphQLOn(on)
  return field
}
