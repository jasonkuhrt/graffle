import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { ModuleGeneratorSchemaRuntime } from './SchemaRuntime.js'

export const ModuleGeneratorClient = createModuleGenerator(
  `Client`,
  ({ config, code }) => {
    code.push(
      `import { createPrefilled } from '${config.libraryPaths.client}'`,
      `import { $defaultSchemaUrl, $Index } from './${ModuleGeneratorSchemaRuntime.name}.js'`,
      ``,
      `export const create = createPrefilled(\`${config.name}\`, $Index, $defaultSchemaUrl)`,
    )

    return code
  },
)
