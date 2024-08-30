import { globby, type Options } from 'globby'
import * as FS from 'node:fs/promises'

export const deleteFiles = async (input: { pattern: string; options?: Options }) => {
  const paths = await globby(input.pattern, input.options)
  await Promise.all(paths.map(async (path) => {
    await FS.unlink(path)
  }))
  return {
    paths,
  }
}
