import { dynamicValue } from './$/helpers'

export const encode = (value: string) => {
  return value.replace(/Headers {[^}]*}/s, dynamicValue)
}
