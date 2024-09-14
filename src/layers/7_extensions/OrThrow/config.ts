import type { ConfigManager } from '../../../lib/prelude.js'

export type Input = {
  /**
   * @defaultValue `OrThrow`
   */
  suffix?: string
}

export type Config = {
  suffix: string
}

export const defaultConfig = {
  suffix: `OrThrow` as const,
} satisfies Config

export type DefaultConfig = {
  suffix: typeof defaultConfig.suffix
}

export const createConfig = (input?: Input): Config => {
  return {
    suffix: input?.suffix ?? defaultConfig.suffix,
  }
}

// dprint-ignore
export type createConfig<$Input extends Input> =
  // If base type then can mean nothing was passed into constrained optional input. 
  Input extends $Input
    ? DefaultConfig
    : {
        suffix: ConfigManager.OrDefault<$Input['suffix'], DefaultConfig['suffix']>
      }
