import { dynamicValue } from '../../$/helpers.js'

export const encode = (value: string) => {
  return value.replace(/Headers {[^}]*}/s, dynamicValue)
}
