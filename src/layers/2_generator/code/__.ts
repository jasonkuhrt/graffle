import { createCodeGenerator } from '../createCodeGenerator.js'
import { moduleName_ } from './_.js'

export const { generate: generate__, moduleName: moduleName__ } = createCodeGenerator(
  `__`,
  (_config) => {
    const code: string[] = []
    // todo allow user to customize namespace. Should "default" map to "Graffle" and then anything else is explicitly passed through?
    code.push(
      `export * as Graffle from './${moduleName_}.js'`,
    )

    return code.join(`\n\n`)
  },
)
