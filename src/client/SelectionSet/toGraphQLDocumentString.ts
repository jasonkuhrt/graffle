import { RootTypeName } from '../../lib/graphql.js'
import { lowerCaseFirstLetter } from '../../lib/prelude.js'
import { Schema } from '../../Schema/__.js'
import { readMaybeThunk } from '../../Schema/core/helpers.js'
import type { ReturnModeType } from '../Config.js'
import type { SelectionSet } from './__.js'
import { aliasPattern, fragmentPattern } from './SelectionSet.js'

type SpecialFields = {
  // todo - this requires having the schema at runtime to know which fields to select.
  // $scalars?: SelectionSet.Indicator
  $include?: SelectionSet.Directive.Include['$include']
  $skip?: SelectionSet.Directive.Skip['$skip']
  $defer?: SelectionSet.Directive.Defer['$defer']
  $stream?: SelectionSet.Directive.Stream['$stream']
  $?: Args
}

type Args = { [k: string]: Args_ }

type Args_ = string | boolean | null | number | Args

type Indicator = 0 | 1 | boolean

export type DocumentObject = Record<string, GraphQLRootSelection>

export type GraphQLRootSelection = { query: GraphQLObjectSelection } | { mutation: GraphQLObjectSelection }

export type GraphQLObjectSelection = Record<string, Indicator | SS>

export type SS = {
  [k: string]: Indicator | SS
} & SpecialFields

export interface Context {
  schemaIndex: Schema.Index
  config: {
    returnMode: ReturnModeType
  }
}

export const rootTypeSelectionSet = (
  context: Context,
  schemaObject: Schema.Object$2,
  ss: GraphQLObjectSelection,
  name?: string,
) => {
  return `${lowerCaseFirstLetter(schemaObject.fields.__typename.type.type)} ${name ?? ``} { ${
    selectionSet(context, schemaObject, ss)
  } }`
}

const directiveArgs = (config: object) => {
  return Object.entries(config).filter(([_, v]) => v !== undefined).map(([k, v]) => {
    return `${k}: ${JSON.stringify(v)}`
  }).join(`, `)
}

const resolveDirectives = (ss: SS) => {
  const { $include, $skip, $defer, $stream } = ss

  let directives = ``

  if ($stream !== undefined) {
    const config = {
      if: typeof $stream === `boolean` ? $stream : $stream.if === undefined ? true : $stream.if,
      label: typeof $stream === `boolean` ? undefined : $stream.label,
      initialCount: typeof $stream === `boolean` ? undefined : $stream.initialCount,
    }
    directives += `@stream(${directiveArgs(config)})`
  }

  if ($defer !== undefined) {
    const config = {
      if: typeof $defer === `boolean` ? $defer : $defer.if === undefined ? true : $defer.if,
      label: typeof $defer === `boolean` ? undefined : $defer.label,
    }
    directives += `@defer(${directiveArgs(config)})`
  }

  if ($include !== undefined) {
    directives += `@include(if: ${
      String(typeof $include === `boolean` ? $include : $include.if === undefined ? true : $include.if)
    })`
  }

  if ($skip !== undefined) {
    directives += `@skip(if: ${String(typeof $skip === `boolean` ? $skip : $skip.if === undefined ? true : $skip.if)})`
  }

  return directives
}

const resolveArgs = (schemaField: Schema.SomeField, ss: SS) => {
  const { $ } = ss
  let args = ``
  if ($ !== undefined) {
    const schemaArgs = schemaField.args
    if (!schemaArgs) throw new Error(`Field has no args`)

    const entries = Object.entries($)
    args = entries.length === 0 ? `` : `(${
      entries.map(([argName, v]) => {
        const schemaArg = schemaArgs.fields[argName] as Schema.Input.Any | undefined // eslint-disable-line
        if (!schemaArg) throw new Error(`Arg ${argName} not found in schema field`)
        if (schemaArg.kind === `Enum`) {
          return `${argName}: ${String(v)}`
        } else {
          // todo if enum, do not quote, requires schema index
          return `${argName}: ${JSON.stringify(v)}`
        }
      }).join(`, `)
    })`
  }
  return args
}
const pruneNonSelections = (ss: SS) => {
  const entries = Object.entries(ss)
  const selectEntries = entries.filter(_ => !_[0].startsWith(`$`))
  return Object.fromEntries(selectEntries)
}

const indicatorOrSelectionSet = (
  context: Context,
  schemaField: Schema.SomeField,
  ss: null | Indicator | SS,
): string => {
  if (ss === null) return `null` // todo test this case
  if (isIndicator(ss)) return ``

  const entries = Object.entries(ss)
  const selectEntries = entries.filter(_ => !_[0].startsWith(`$`))
  const directives = resolveDirectives(ss)
  const args = resolveArgs(schemaField, ss)

  if (selectEntries.length === 0) {
    return `${args} ${directives}`
  }

  const selection = Object.fromEntries(selectEntries) as GraphQLObjectSelection

  // eslint-disable-next-line
  // @ts-ignore ID error
  const schemaNamedOutputType = Schema.Output.unwrapToNamed(schemaField.type) as Schema.Object$2
  return `${args} ${directives} {
		${selectionSet(context, readMaybeThunk(schemaNamedOutputType), selection)}
	}`
}

export const selectionSet = (
  context: Context,
  schemaItem: Schema.Object$2 | Schema.Union | Schema.Interface,
  ss: GraphQLObjectSelection,
): string => {
  // todo optimize by doing single loop
  const applicableSelections = Object.entries(ss).filter(([_, ss]) => isPositiveIndicator(ss))
  switch (schemaItem.kind) {
    case `Object`: {
      const rootTypeName = ((RootTypeName as any)[schemaItem.fields.__typename.type.type] ?? null) as
        | RootTypeName
        | null
      return applicableSelections.map(([fieldExpression, ss]) => {
        const fieldName = parseFieldName(fieldExpression)
        const schemaField = schemaItem.fields[fieldName.actual]
        if (!schemaField) throw new Error(`Field ${fieldExpression} not found in schema object`)
        // dprint-ignore
        if (rootTypeName&&context.config.returnMode===`successData`&&context.schemaIndex.error.rootResultFields[rootTypeName][fieldName.actual]) {

          (ss as any).__typename = true
        }
        return `${resolveFragment(resolveAlias(fieldExpression))} ${indicatorOrSelectionSet(context, schemaField, ss)}`
      }).join(`\n`) + `\n`
    }
    case `Interface`: {
      return applicableSelections.map(([fieldExpression, ss]) => {
        const fieldItem = parseFieldItem(fieldExpression)
        switch (fieldItem._tag) {
          case `FieldName`: {
            if (fieldItem.actual === `__typename`) {
              return `${renderFieldName(fieldItem)} ${resolveDirectives(ss)}`
            }
            const schemaField = schemaItem.fields[fieldItem.actual]
            if (!schemaField) throw new Error(`Field ${fieldExpression} not found in schema object`)
            // dprint-ignore
            return `${resolveFragment(resolveAlias(fieldExpression))} ${ indicatorOrSelectionSet(context, schemaField, ss) }`
          }
          case `FieldOn`: {
            const schemaObject = context.schemaIndex[`objects`][fieldItem.typeOrFragmentName]
            if (!schemaObject) throw new Error(`Fragment ${fieldItem.typeOrFragmentName} not found in schema`)
            return `${renderOn(fieldItem)} ${resolveDirectives(ss)} { ${selectionSet(context, schemaObject, ss)} }`
          }
          default: {
            throw new Error(`Unknown field item tag`)
          }
        }
      }).join(`\n`) + `\n`
    }
    case `Union`: {
      return applicableSelections.map(([fieldExpression, ss]) => {
        const fieldItem = parseFieldItem(fieldExpression)
        switch (fieldItem._tag) {
          case `FieldName`: {
            if (fieldItem.actual === `__typename`) {
              return `${renderFieldName(fieldItem)} ${resolveDirectives(ss)}`
            }
            // todo
            throw new Error(`todo resolve common interface fields from unions`)
          }
          case `FieldOn`: {
            const schemaObject = context.schemaIndex[`objects`][fieldItem.typeOrFragmentName]
            if (!schemaObject) throw new Error(`Fragment ${fieldItem.typeOrFragmentName} not found in schema`)
            return `${renderOn(fieldItem)} ${resolveDirectives(ss)} { ${
              selectionSet(context, schemaObject, pruneNonSelections(ss))
            } }`
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

type FieldItem = FieldOn | FieldName

const parseFieldItem = (field: string): FieldItem => {
  const on = parseOnExpression(field)
  if (on) return on
  return parseFieldName(field)
}

interface FieldOn {
  _tag: 'FieldOn'
  typeOrFragmentName: string
}

const parseOnExpression = (field: string): null | FieldOn => {
  const match = field.match(fragmentPattern)
  if (match?.groups) {
    return {
      _tag: `FieldOn`,
      typeOrFragmentName: match.groups[`name`]!,
    }
  }
  return null
}

const renderOn = (on: FieldOn) => {
  return `...on ${on.typeOrFragmentName}`
}

// todo use a given schema to ensure that field is actually a fragment and not just happened to be using pattern onX
const resolveFragment = (field: string) => {
  const match = field.match(fragmentPattern)
  if (match?.groups) {
    return `...on ${match.groups[`name`]!}`
  }
  return field
}

interface FieldName {
  _tag: 'FieldName'
  actual: string
  alias: string | null
}
// todo use a given schema to ensure that field is actually a fragment and not just happened to be using pattern onX
const parseFieldName = (field: string): FieldName => {
  const match = field.match(aliasPattern)
  if (match?.groups) {
    return {
      _tag: `FieldName`,
      actual: match.groups[`actual`]!,
      alias: match.groups[`alias`]!,
    }
  }
  return {
    _tag: `FieldName`,
    actual: field,
    alias: null,
  }
}

const renderFieldName = (fieldName: FieldName) => {
  if (fieldName.alias) {
    return `${fieldName.actual}: ${fieldName.alias}`
  } else {
    return fieldName.actual
  }
}

// todo use a given schema to ensure that field is actually a fragment and not just happened to be using pattern onX
const resolveAlias = (field: string) => {
  const match = field.match(aliasPattern)
  if (match?.groups) {
    return `${match.groups[`actual`]!}: ${match.groups[`alias`]!}`
  }
  return field
}

const isIndicator = (v: any): v is Indicator => {
  return String(v) in indicator
}

const isPositiveIndicator = (v: any): v is SelectionSet.ClientIndicatorPositive => {
  return !(String(v) in negativeIndicator)
}

const negativeIndicator = {
  '0': 0,
  'false': false,
  'undefined': undefined,
}

const positiveIndicator = {
  '1': 1,
  'true': true,
}

const indicator = {
  ...negativeIndicator,
  ...positiveIndicator,
}
