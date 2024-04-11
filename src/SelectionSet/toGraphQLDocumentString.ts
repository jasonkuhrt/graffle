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

export type GraphQLDocumentObject = {
  [k: string]: Indicator | SS
}

type SS = {
  [k: string]: Indicator | SS
} & SpecialFields

export const toGraphQLDocumentString = (ss: GraphQLDocumentObject) => {
  let docString = ``
  docString += `query {
		${selectionSet(ss)}
	}`
  return docString
}

const directiveArgs = (config: object) => {
  return Object.entries(config).filter(([_, v]) => v !== undefined).map(([k, v]) => {
    return `${k}: ${JSON.stringify(v)}`
  }).join(`, `)
}

const indicatorOrSelectionSet = (ss: null | Indicator | SS): string => {
  if (ss === null) return `null` // todo test this case
  if (isIndicator(ss)) return ``

  const { $include, $skip, $defer, $stream, $, ...rest } = ss

  let args = ``
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

  if ($ !== undefined) {
    const entries = Object.entries($)
    args = entries.length === 0 ? `` : `(${
      entries.map(([k, v]) => {
        return `${k}: ${JSON.stringify(v)}`
      }).join(`, `)
    })`
  }

  if (Object.keys(rest).length === 0) {
    return `${args} ${directives}`
  }

  return `${args} ${directives} {
		${selectionSet(rest)}
	}`
}

const selectionSet = (ss: GraphQLDocumentObject) => {
  return Object.entries(ss).filter(([_, v]) => {
    return isPositiveIndicator(v)
  }).map(([field, ss]) => {
    return `${resolveFragment(resolveAlias(field))} ${indicatorOrSelectionSet(ss)}`
  }).join(`\n`) + `\n`
}

// todo use a given schema to ensure that field is actually a fragment and not just happened to be using pattern onX
const resolveFragment = (field: string) => {
  const match = field.match(fragmentPattern)
  if (match?.groups) {
    return `...on ${match.groups[`name`]!}`
  }
  return field
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
