import { casesExhausted } from './prelude.js'

type Parameter = { type: 'name'; value: string } | { type: 'destructured'; names: string[] }

export const analyzeFunction = (fn: (...args: [...any[]]) => unknown) => {
  const groups = fn.toString().match(functionPattern)?.groups
  if (!groups) throw new Error(`Could not extract groups from function.`)

  const body = groups[`bodyStatement`] ?? groups[`bodyExpression`]
  if (body === undefined) throw new Error(`Could not extract body from function.`)

  const parameters: Parameter[] = []

  if (groups[`parameters`]) {
    const results = [...groups[`parameters`].matchAll(functionParametersPattern)]
    const resultParameters = results.map(result => {
      const type = result.groups?.[`destructured`] ? `destructured` : result.groups?.[`name`] ? `name` : null

      switch (type) {
        case `destructured`:
          const valueRaw = result.groups![`destructured`]!
          const names = [...valueRaw.matchAll(destructuredPattern)].map(result => {
            const name = result.groups![`name`]
            if (name === undefined) throw new Error(`Could not extract name from destructured parameter.`)
            return name
          })
          return {
            type,
            names,
          } as const
        case `name`:
          return {
            type,
            value: result.groups![`name`]!,
          } as const
        case null:
          throw new Error(`Could not determine type of parameter.`)
        default:
          throw casesExhausted(type)
      }
    })

    parameters.push(...resultParameters)
  }

  return {
    body,
    parameters,
  }
}

/**
 * @see https://regex101.com/r/9kCK86/4
 */
// const functionPattern = /(?:[A-z])?\s*(?:\((?<parameters>.*)\))\s*(?:=>)?\s*{(?<body>.*)(?=})/s

/**
 * @see https://regex101.com/r/U0JtfS/1
 */
const functionPattern =
  /^(?:(?<async>async)\s+)?(?:function\s+)?(?:(?<name>[A-z_0-9]+)\s*)?\((?<parameters>[^)]*)\)\s*(?:=>\s*(?<bodyExpression>[^\s{].*)|(?:=>\s*)?{(?<bodyStatement>.*)})$/s

/**
 * @see https://regex101.com/r/tE2dV5/2
 */
const functionParametersPattern = /(?<destructured>\{[^}]+\})|(?<name>[A-z_][A-z_0-9]*)/gs

/**
 * https://regex101.com/r/WHwazx/1
 */
const destructuredPattern = /(?<name>[A-z_][A-z_0-9]*)(?::[^},]+)?/gs
