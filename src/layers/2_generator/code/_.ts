import { createCodeGenerator } from '../createCodeGenerator.js'
import { moduleNameSelect } from './Select.js'

export const { generate: generate_, moduleName: moduleName_ } = createCodeGenerator(
  `_`,
  (_config) => {
    const code: string[] = []
    code.push(
      `export * as Select from './${moduleNameSelect}.js'`,
    )

    return code.join(`\n\n`)
  },
)
