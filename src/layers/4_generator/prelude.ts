import fs from 'node:fs/promises'
import { errorFromMaybeError } from '../../lib/prelude.js'

export const fileExists = async (path: string) => {
  return Boolean(
    await fs.stat(path).catch((_: unknown) => {
      const error = errorFromMaybeError(_)
      return `code` in error && typeof error.code === `string` && error.code === `ENOENT`
        ? null
        : Promise.reject(error)
    }),
  )
}
