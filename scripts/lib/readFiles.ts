import { globby, type Options } from 'globby'
import * as FS from 'node:fs/promises'
import * as Path from 'node:path'

export interface File {
  content: string
  name: string
  path: {
    full: string
    dir: string
  }
}

export const readFiles = async (input: { pattern: string; options?: Options }): Promise<File[]> => {
  const filePaths = await globby(input.pattern, input.options)

  const files = await Promise.all(filePaths.map(async (path): Promise<File> => {
    const content = await FS.readFile(path, `utf-8`)
    return {
      content,
      name: Path.basename(path, `.ts`),
      path: {
        full: path,
        dir: Path.dirname(path),
      },
    }
  }))

  return files
}
