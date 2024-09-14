import {
  type BuilderConfig,
  type BuilderRequestMethods,
  createExtension,
  type Extension,
  type WithInput,
} from '../../../entrypoints/main.js'
import { type ConfigManager, getValueAtPath, type SuffixMethodsDeep } from '../../../lib/prelude.js'
import { type Config, createConfig, type Input } from './config.js'

export const OrThrow = <const $Input extends Input>(input?: $Input) => {
  const config = createConfig(input)

  return createExtension<OrThrowExtension<createConfig<$Input>>>({
    name: `OrThrow`,
    onBuilderGet: ({ client, property, path }) => {
      if (!property.endsWith(config.suffix)) return

      // todo redesign input to allow to force throw always
      // todo pull pre-configured config from core
      const graffleConfig: WithInput = {
        output: {
          envelope: {
            enabled: client.internal.config.output.envelope.enabled,
            errors: {
              execution: false,
              other: false,
              // @ts-expect-error
              schema: false,
            },
          },
          errors: {
            execution: `throw`,
            other: `throw`,
            // @ts-expect-error
            schema: `throw`,
          },
        },
      }

      return (...args: [...unknown[]]) => {
        const redirectedPath = [...path, property.slice(0, config.suffix.length * -1)]
        const clientReconfigured = client.with(graffleConfig)
        const value = getValueAtPath(clientReconfigured, redirectedPath)
        const valueType = typeof value
        if (valueType !== `function`) {
          throw new Error(`Expected function at path ${redirectedPath.join(`.`)} but got ${valueType}`)
        }
        return (value as any)(...args)
      }
    },
  })
}

interface OrThrowExtension<$Input extends Config> extends Extension {
  builderMerge: SuffixMethodsDeep<
    $Input['suffix'],
    BuilderRequestMethods<
      // @ts-expect-error fixme
      OrThrowifyConfig<this['params']['Config']>,
      this['params']['Index']
    >
  >
}

// todo this changed, check tests, add new tests as needed.
// dprint-ignore
export type OrThrowifyConfig<$BuilderConfig extends BuilderConfig> =
  ConfigManager.Set<$BuilderConfig, ['output', 'errors'], { other: 'throw', execution: 'throw', schema: 'throw' }>
