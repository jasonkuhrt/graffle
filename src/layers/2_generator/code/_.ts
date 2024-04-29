import { createCodeGenerator } from '../createCodeGenerator.js'
import { moduleNameClient } from './Client.js'
import { moduleNameError } from './Error.js'
import { moduleNameSelect } from './Select.js'

export const { generate: generate_, moduleName: moduleName_ } = createCodeGenerator(
  `_`,
  (_config) => {
    const code: string[] = []
    code.push(
      `export { Select } from './${moduleNameSelect}.js'`,
      `export { isError } from './${moduleNameError}.js'`,
      `export { create } from './${moduleNameClient}.js'`,
    )

    return code.join(`\n`)
  },
)
