import fs from 'node:fs/promises'
import { extname, isAbsolute, join } from 'node:path'
import { errorFromMaybeError } from './prelude.js'

export const statMaybeExists = async (path: string) => {
  return await fs.stat(path).catch((_: unknown) => {
    const error = errorFromMaybeError(_)
    return `code` in error && typeof error.code === `string` && error.code === `ENOENT`
      ? null
      : Promise.reject(error)
  })
}

export const fileExists = async (path: string) => {
  return Boolean(await statMaybeExists(path))
}

export const isPathToADirectory = async (path: string) => {
  const stat = await fs.stat(path)
  return stat.isDirectory()
}

export const toAbsolutePath = (cwd: string, maybeAbsolutePath: string) =>
  isAbsolute(maybeAbsolutePath) ? maybeAbsolutePath : join(cwd, maybeAbsolutePath)

const isFileLikePath = (path: string) => {
  return Boolean(extname(path))
}

export const toFilePath = (fileName: string, path: string) => {
  if (isFileLikePath(path)) {
    return path
  } else {
    return join(path, fileName)
  }
}

// export const toFileChecked = async (fileName: string, path: string) => {
//   if (isFileLikePath(path)) {
//     return path
//   } else {
//     return join(path, fileName)
//   }
// }
