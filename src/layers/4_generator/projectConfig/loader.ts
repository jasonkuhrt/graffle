import * as Path from 'node:path'
import { ConfigManager } from '../../../lib/config-manager/__.js'
import { Errors } from '../../../lib/errors/__.js'
import { importFirst } from '../../../lib/import-first.js'
import { isError } from '../../../lib/prelude.js'
import { type Builder, isBuilder } from './builder.js'

interface Config {
  filePath: string
}

interface Input {
  filePath?: string
}

const defaults: Config = {
  filePath: `./graffle.config`,
}

const defaultExtensions = [`ts`, `js`, `mjs`, `mts`]

export const load = async (input: Input): Promise<null | Builder | Errors.ContextualError> => {
  const config = ConfigManager.mergeDefaults(defaults, input)
  const extensionCandidates = Path.extname(config.filePath) ? [Path.extname(config.filePath)] : defaultExtensions
  const pathParsed = Path.parse(config.filePath)
  const pathWithoutExt = Path.join(pathParsed.dir, pathParsed.name)
  const importPathCandidates = extensionCandidates.map(ext => `${pathWithoutExt}.${ext}`)

  const builder = await importFirst(importPathCandidates)

  if (!builder) return null

  if (isError(builder)) {
    return new Errors.ContextualError(
      `Failed to import project Graffle configuration file.`,
      { importPathCandidates },
      builder,
    )
  }

  if (!isBuilder(builder.module)) {
    throw new Errors.ContextualError(
      `Invalid project Graffle configuration file. It does not export a builder.`,
      {
        path: builder.path,
        value: builder.module,
      },
    )
  }

  return builder.module
}
