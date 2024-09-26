import type { Simplify } from 'type-fest'
import type { ExcludeNull, UnionExpanded } from '../../lib/prelude.js'
import type { Schema, SomeField } from '../1_Schema/__.js'
import type { Directive } from './_.js'
import type { Args } from './types.js'

/**
 * Should this field be selected?
 */
export type ClientIndicator = UnionExpanded<ClientIndicatorPositive | ClientIndicatorNegative>

export type ClientIndicatorPositive = true

export type ClientIndicatorNegative = UnionExpanded<false | undefined>

export type Indicator = boolean

export const isIndicator = (v: any): v is Indicator => {
  return String(v) in indicator
}

export const isPositiveIndicator = (v: any): v is ClientIndicatorPositive => {
  return !(String(v) in negativeIndicator)
}

const negativeIndicator = {
  'false': false,
  'undefined': undefined,
}

const positiveIndicator = {
  'true': true,
}

const indicator = {
  ...negativeIndicator,
  ...positiveIndicator,
}

export type Any = ClientIndicator | (Directive.$Fields & { $?: Schema.Args<any> })

/**
 * Field selection in general, with directives support too.
 * If a field directive is given as an indicator then it implies "select this" e.g. `true`/`1`.
 * Of course the semantics of the directive may change the derived type (e.g. `skip` means the field might not show up in the result set)
 */
export type NoArgsIndicator = ClientIndicator | Directive.$Fields

export type NoArgsIndicator$Expanded = UnionExpanded<ClientIndicator | Simplify<Directive.$Fields>>

// dprint-ignore
export type ArgsIndicator<$Args extends Schema.Args<any>> =
  $Args['isFieldsAllNullable'] extends true
    ? ({ $?: Args<$Args> } & Directive.$Fields) | ClientIndicator
    : { $: Args<$Args> } & Directive.$Fields

// dprint-ignore
export type IndicatorForField<$Field extends SomeField> =
  $Field['args'] extends null
    ? NoArgsIndicator
    : ArgsIndicator<ExcludeNull<$Field['args']>>
