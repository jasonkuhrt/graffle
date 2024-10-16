import type { Extension } from '../../6_client/extension/extension.js'
import { normalizeInput, type ProjectConfig, type ProjectConfigInput } from './types.js'

export interface Builder {
  _: {
    config: ProjectConfig
  }
  use: (extension: Extension) => Builder
}

export const create = (input: ProjectConfigInput) => {
  return create_(normalizeInput(input))
}

const create_ = (config: ProjectConfig): Builder => {
  return {
    _: {
      config,
    },
    /**
     * todo
     */
    use: (extension) => {
      return create_({
        ...config,
        extensions: [...config.extensions, extension],
      })
    },
  }
}

export const isBuilder = (value: unknown): value is Builder => {
  return true // todo
}
