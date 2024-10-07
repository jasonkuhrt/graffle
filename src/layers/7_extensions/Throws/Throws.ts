import { type BuilderConfig, createExtension, type Extension, type WithInput } from '../../../entrypoints/main.js'
// todo: no deep imports, rethink these utilities and/or how they are exported from the graffle package.
import type { Fluent } from '../../../lib/fluent/__.js'
import { type ConfigManager } from '../../../lib/prelude.js'
import type { IncrementWthNewConfig } from '../../6_client/client.js'
import type { FnParametersProperty } from '../../6_client/fluent.js'

export const Throws = () => {
  return createExtension<ThrowsExtension>({
    name: `Throws`,
    onBuilderGet: ({ client, property, path }) => {
      if (property !== `throws` || path.length !== 0) return undefined

      // todo redesign input to allow to force throw always
      // todo pull pre-configured config from core
      const throwsifiedInput: WithInput = {
        output: {
          envelope: {
            enabled: client._.config.output.envelope.enabled,
            // @ts-expect-error
            errors: { execution: false, other: false, schema: false },
          },
          // @ts-expect-error
          errors: { execution: `throw`, other: `throw`, schema: `throw` },
        },
      }
      return () => client.with(throwsifiedInput)
    },
  })
}

interface ThrowsExtension extends Extension {
  property: ThrowsFn
}

export interface ThrowsFn extends Fluent.FnProperty<`throws`> {
  // @ts-expect-error untyped params
  return: Throws<this['params']>
}

interface Throws<$Args extends FnParametersProperty> {
  /**
   * TODO
   */
  // @ts-expect-error fixme
  (): IncrementWthNewConfig<$Args, ThrowsifyConfig<$Args['state']['context']['config']>>
}

type ThrowsifyConfig<$BuilderConfig extends BuilderConfig> = ConfigManager.Set<
  $BuilderConfig,
  ['output', 'errors'],
  { other: 'throw'; execution: 'throw'; schema: 'throw' }
>
