import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { ModuleGeneratorClient } from './Client.js'
import { ModuleGeneratorError } from './Error.js'
import { ModuleGeneratorSelect } from './Select.js'

export const ModuleGenerator_ = createModuleGenerator(
  `_`,
  ({ code }) => {
    code(
      `// We import the global module for good measure although it is not clear it is always needed.`,
      `// It at least helps with Twoslash wherein without this import here Twoslash will not include the global module.`,
      `// In real TypeScript projects it seems the global module is included automatically. But there could be certain tsconfig`,
      `// setups where this still indeed does help.`,
      `import './modules/Global.js'`,
      ``,
      `export { Select } from './modules/${ModuleGeneratorSelect.name}.js'`,
      `export { isError } from './modules/${ModuleGeneratorError.name}.js'`,
      `export { create } from './modules/${ModuleGeneratorClient.name}.js'`,
    )

    return code
  },
)
