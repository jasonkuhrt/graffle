import { createModuleGenerator } from '../createCodeGenerator.js'
import { moduleNameClient } from './Client.js'
import { moduleNameError } from './Error.js'
import { moduleNameSelect } from './Select.js'

export const { generate: generate_, moduleName: moduleName_ } = createModuleGenerator(
  `_`,
  ({ code }) => {
    code.push(
      `// We import the global module for good measure although it is not clear it is always needed.`,
      `// It at least helps with Twoslash wherein without this import here Twoslash will not include the global module.`,
      `// In real TypeScript projects it seems the global module is included automatically. But there could be certain tsconfig`,
      `// setups where this still indeed does help.`,
      `import './modules/Global.js'`,
      ``,
      `export { Select } from './modules/${moduleNameSelect}.js'`,
      `export { isError } from './modules/${moduleNameError}.js'`,
      `export { create } from './modules/${moduleNameClient}.js'`,
    )

    return code
  },
)
