import { ModuleGeneratorSchemaDrivenDataMap } from '../../7_extensions/CustomScalars/schemaDrivenDataMap/generator.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { ModuleGeneratorData } from './Data.js'

export const ModuleGeneratorClient = createModuleGenerator(
  `Client`,
  ({ config, code }) => {
    code(
      `import { createPrefilled } from '${config.paths.imports.grafflePackage.client}'`,
      `import { defaultSchemaUrl } from './${ModuleGeneratorData.name}.js'`,
      `import { SchemaDrivenDataMap } from './${ModuleGeneratorSchemaDrivenDataMap.name}.js'`,
      ``,
      `export const create = createPrefilled(\`${config.name}\`, SchemaDrivenDataMap, defaultSchemaUrl)`,
    )
  },
)
