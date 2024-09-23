import { type BuilderConfig, createExtension, type Extension, type WithInput } from '../../../entrypoints/main.js'
import type { HKT } from '../../../entrypoints/utilities-for-generated.js'
import { type ConfigManager, getValueAtPath } from '../../../lib/prelude.js'

export const OrThrow = () => {
  return createExtension<OrThrowExtension>({
    name: `OrThrow`,
    //   onBuilderGet: ({ client, property, path }) => {
    //     if (property === 'throw' && path.length === 0) {
    //     // todo redesign input to allow to force throw always
    //     // todo pull pre-configured config from core
    //     const orThrowifiedInput: WithInput = {
    //       output: {
    //         envelope: {
    //           enabled: client.internal.config.output.envelope.enabled,
    //           // @ts-expect-error
    //           errors: { execution: false, other: false, schema: false },
    //         },
    //         // @ts-expect-error
    //         errors: { execution: `throw`, other: `throw`, schema: `throw` },
    //       },
    //     }
    //     return (builder) => {
    //       return builder(/*...*/)
    //     }
    //   },
  })
}

interface OrThrowExtension extends Extension {
  builderChain: BuilderChain
}

interface BuilderChain extends HKT.Fn {
  return: BuilderChain_<this['params']>
}

interface BuilderChain_<$Params extends { BuilderFn: HKT.Fn; BuilderParams: {} }> {
  throw: () => HKT.Call<$Params['BuilderFn'], $Params['BuilderParams']>
}

type OrThrowifyConfig<$BuilderConfig extends BuilderConfig> = ConfigManager.Set<
  $BuilderConfig,
  ['output', 'errors'],
  { other: 'throw'; execution: 'throw'; schema: 'throw' }
>
