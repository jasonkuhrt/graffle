import { Include } from './include.js'
import { Skip } from './skip.js'

export const definitionsByName = {
  include: Include,
  skip: Skip,
}

export const keyPrefix = `$`

export const parseKey = (key: string): string | null => {
  if (key.startsWith(keyPrefix)) {
    return key.slice(keyPrefix.length)
  }

  return null
}
