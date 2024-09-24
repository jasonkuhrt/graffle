import type { Fluent } from '../../../lib/fluent/__.js'
import { mergeHeadersInit, mergeRequestInit } from '../../../lib/http.js'
import type { IncrementWthNewConfig } from '../client.js'
import { defineProperties, type FnParametersProperty } from '../fluent.js'
import type { AddIncrementalInput, WithInput } from '../Settings/inputIncrementable/inputIncrementable.js'

export interface FnWith extends Fluent.FnProperty<`with`> {
  // @ts-expect-error untyped params
  return: With<this['params']>
}

export interface With<$Args extends FnParametersProperty> {
  /**
   * TODO With Docs.
   */
  <$Input extends WithInput<$Args['state']['context']['config']>>(
    input: $Input,
    // todo fixme
    // eslint-disable-next-line
    // @ts-ignore Passes after generation
  ): IncrementWthNewConfig<$Args, AddIncrementalInput<$Args['state']['context']['config'], $Input>>
}

export const withProperties = defineProperties((builder, state) => {
  return {
    with: (input: WithInput) => {
      return builder({
        ...state,
        // @ts-expect-error fixme
        input: {
          ...state.input,
          output: input.output,
          transport: {
            ...state.input.transport,
            ...input.transport,
            headers: mergeHeadersInit(state.input.transport?.headers, input.transport?.headers),
            raw: mergeRequestInit(state.input.transport?.raw, input.transport?.raw),
          },
        },
      })
    },
  }
})
