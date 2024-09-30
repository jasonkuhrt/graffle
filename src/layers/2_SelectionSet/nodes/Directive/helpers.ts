import { Include } from './include.js'
import { Skip } from './skip.js'

export const definitionsByName = {
  include: Include,
  skip: Skip,
}

export const keyPrefix = `$`

export const getSelectDirective = (field: Record<string, any>, directiveName: string) => {
  const key = `${keyPrefix}${directiveName}`

  if (field[key] !== undefined) {
    return {
      argumentsInput: field[key],
    }
  }

  return undefined
}
