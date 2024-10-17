import * as Path from 'node:path'
import { Errors } from '../../../lib/errors/__.js'
import { isPathToADirectory, toAbsolutePath } from '../../../lib/fs.js'
import { importFirst } from '../../../lib/import-first.js'
import { isError } from '../../../lib/prelude.js'
import { type Builder, isBuilder } from './builder.js'

interface Config {
  fileName: string
}

interface Input {
  /**
   * The path to the config file. If is a directory then will look for the configured file
   * name with one of the supported extensions in the directory.
   */
  filePath?: string
  options?: {
    /**
     * Config file name.
     *
     * @defaultValue `graffle.config`
     *
     * An attempt to import it using the following extensions will be made:
     *
     * - `.ts`
     * - `.js`
     * - `.mjs`
     * - `.mts`
     */
    fileName?: string
  }
}

export const loadDefaults: Config = {
  fileName: `graffle.config`,
}

const extensionCandidates = [`ts`, `js`, `mjs`, `mts`]

export const load = async (
  input?: Input,
): Promise<
  | { builder: null; paths: string[]; path: null }
  | { builder: Builder; path: string; paths: string[] }
  | Errors.ContextualError
> => {
  const importPathCandidates = await processInput(input?.filePath)

  const importedModule = await importFirst(importPathCandidates)

  if (!importedModule) {
    return {
      builder: null,
      paths: importPathCandidates,
      path: null,
    }
  }

  if (isError(importedModule)) {
    return new Errors.ContextualError(
      `Failed to import project Graffle configuration file.`,
      { importPathCandidates },
      importedModule,
    )
  }

  if (!isBuilder(importedModule.module[`default`])) {
    throw new Errors.ContextualError(
      `Invalid project Graffle configuration file. It does not have a default export of the configuration.`,
      {
        path: importedModule.path,
        value: importedModule.module,
      },
    )
  }

  return {
    builder: importedModule.module[`default`],
    path: importedModule.path,
    paths: importPathCandidates,
  }
}

const processInput = async (input?: string) => {
  if (!input) {
    const directoryPath = process.cwd()
    const path = Path.join(directoryPath, loadDefaults.fileName)
    return extensionCandidates.map(ext => toAbsolutePath(process.cwd(), `${path}.${ext}`))
  }

  const absolutePath = toAbsolutePath(process.cwd(), input)

  if (await isPathToADirectory(absolutePath)) {
    const directoryPath = absolutePath
    const path = Path.join(directoryPath, loadDefaults.fileName)
    return extensionCandidates.map(ext => `${path}.${ext}`)
  }

  return [absolutePath]
}
