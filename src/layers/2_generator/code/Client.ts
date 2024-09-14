import { createCodeGenerator } from '../createCodeGenerator.js'
import { moduleNameSchemaRuntime } from './SchemaRuntime.js'

export const { generate: generateClient, moduleName: moduleNameClient } = createCodeGenerator(
  `Client`,
  (config) => {
    const code: string[] = []

    code.push(
      `import { createPrefilled } from '${config.libraryPaths.client}'`,
      `import { $defaultSchemaUrl, $Index } from '../${moduleNameSchemaRuntime}.js'`,
      ``,
      `export const create = createPrefilled(\`${config.name}\`, $Index, $defaultSchemaUrl)`,
    )

    return code.join(`\n\n`)
  },
)
