import { createCodeGenerator } from '../createCodeGenerator.js'
import { moduleNameError } from './Error.js'
import { moduleNameSelect } from './Select.js'

export const { generate: generate_, moduleName: moduleName_ } = createCodeGenerator(
  `_`,
  (_config) => {
    const code: string[] = []
    code.push(
      `export * as Select from './${moduleNameSelect}.js'`,
      `export { isError } from './${moduleNameError}.js'`,
    )

    return code.join(`\n`)
  },
)
