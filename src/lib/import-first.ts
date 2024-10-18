import { errorFromMaybeError } from './prelude.js'

export const importFirst = async (
  paths: string[],
): Promise<undefined | Error | { module: Record<string, unknown>; path: string }> => {
  for (const path of paths) {
    try {
      return {
        module: await import(path),
        path,
      }
    } catch (value) {
      if (isModuleNotFoundError(value)) {
        // silence
      } else {
        return errorFromMaybeError(value)
      }
    }
  }

  return undefined
}

const isModuleNotFoundError = (value: unknown) => {
  return (value instanceof Error && `code` in value && value.code === ERR_MODULE_NOT_FOUND)
}

const ERR_MODULE_NOT_FOUND = `ERR_MODULE_NOT_FOUND`
