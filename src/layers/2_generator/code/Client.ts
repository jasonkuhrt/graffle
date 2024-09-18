import { createModuleGenerator } from '../createCodeGenerator.js'
import { moduleNameSchemaRuntime } from './SchemaRuntime.js'

export const { generate: generateClient, moduleName: moduleNameClient } = createModuleGenerator(
  `Client`,
  ({ config, code }) => {
    code.push(
      `import { createPrefilled } from '${config.libraryPaths.client}'`,
      `import { $defaultSchemaUrl, $Index } from './${moduleNameSchemaRuntime}.js'`,
      ``,
      `export const create = createPrefilled(\`${config.name}\`, $Index, $defaultSchemaUrl)`,
    )

    return code
  },
)
