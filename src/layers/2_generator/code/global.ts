import { createModuleGenerator } from '../createCodeGenerator.js'
import { moduleNameData } from './Data.js'
import { moduleNameSchemaIndex } from './SchemaIndex.js'

export const { moduleName: moduleNameGlobal, generate: generateGlobal } = createModuleGenerator(
  `Global`,
  ({ config, code }) => {
    const StandardScalarNamespace = `StandardScalar`
    const needsDefaultCustomScalarImplementation = config.typeMapByKind.GraphQLScalarTypeCustom.length > 0
      && !config.options.customScalars

    code.push(
      `import type * as Data from './${moduleNameData}.js'`,
      `import type { Index } from './${moduleNameSchemaIndex}.js'`,
    )

    if (config.typeMapByKind.GraphQLScalarTypeCustom.length > 0) {
      code.push(
        `import type * as CustomScalar from '${config.importPaths.customScalarCodecs}'`,
      )
    }

    const defaultSchemaUrlTsDoc = config.defaultSchemaUrl
      ? `\n/**
            * ${config.defaultSchemaUrl.href}
            */`
      : ``

    const customScalarsProperties = config.typeMapByKind.GraphQLScalarTypeCustom
      .map((_) => {
        return `${_.name}: ${
          needsDefaultCustomScalarImplementation ? `${StandardScalarNamespace}.String` : `CustomScalar.${_.name}`
        }`
      }).join(`\n`)

    code.push(`
      declare global {
        export namespace GraffleGlobalTypes {
          export interface Schemas {
            ${config.name}: {
              name: Data.Name
              index: Index
              customScalars: {
                ${customScalarsProperties}
            }
            featureOptions: {
              schemaErrors: ${config.options.errorTypeNamePattern ? `true` : `false`}
            }${defaultSchemaUrlTsDoc}
            defaultSchemaUrl: ${config.defaultSchemaUrl ? `string` : `null`}
          }
        }
      }
    }
  `)

    return code
  },
)
