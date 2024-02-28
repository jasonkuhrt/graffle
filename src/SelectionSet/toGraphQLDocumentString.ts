import type { SelectionSet } from './__.js'

type SpecialFields = {
  // todo
  // $scalars?: SelectionSet.Indicator
  // $?: Record<string, any>
  $include?: SelectionSet.Directive.Include['$include']
  $skip?: SelectionSet.Directive.Skip['$skip']
  $?: Args
}

type Args = { [k: string]: Args_ }

type Args_ = string | boolean | null | number | Args

// const specialFields = {
//   $include: `$include`,
//   $skip: `$skip`,
//   $scalars: `$scalars`,
//   $: `$`,
// }

type SS = {
  [k: string]: SS_
} & SpecialFields

type SS_ = {
  [k: string]: SelectionSet.Indicator | SS_
} & SpecialFields

export const toGraphQLDocumentString = (ss: {}) => {
  let docString = ``
  docString += `query {
		${selectionSet(ss)}
	}`
  return docString
}

const indicatorOrSelectionSet = (ss: SelectionSet.Indicator | SS): string => {
  if (isIndicator(ss)) return ``

  const { $include, $skip, $, ...rest } = ss

  let args = ``
  let directives = ``

  if ($include !== undefined) {
    directives += `@include(if: ${
      typeof $include === `boolean` ? $include : $include.if === undefined ? true : $include.if
    })`
  }

  if ($skip !== undefined) {
    directives += `@skip(if: ${typeof $skip === `boolean` ? $skip : $skip.if === undefined ? true : $skip.if})`
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

const selectionSet = (ss: SS) => {
  return Object.entries(ss).filter(([k, v]) => {
    return isPositiveIndicator(v)
  }).map(([field, ss]) => {
    return `${field} ${indicatorOrSelectionSet(ss)}`
  }).join(`\n`) + `\n`
}

const isIndicator = (v: any): v is SelectionSet.Indicator => {
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
