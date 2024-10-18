import type { SetOptional } from 'type-fest'
import type { Input } from '../config/input.js'
import type { Extension } from '../extension/types.js'

/**
 * Builder input does not require a schema source because it is designed to be used in the config file.
 * The config file is read by the CLI, and can have the schema source specified in the CLI arguments.
 */
export type BuilderInput = SetOptional<Input, 'schema'>

export interface Builder {
  _: {
    input: BuilderInput
  }
  use: (extension: Extension) => Builder
}

export const create = (input: BuilderInput): Builder => {
  return {
    _: {
      input,
    },
    /**
     * todo
     */
    use: (extension) => {
      return create({
        ...input,
        extensions: [...(input.extensions ?? []), extension],
      })
    },
  }
}

export const isBuilder = (value: unknown): value is Builder => {
  return true // todo
}
