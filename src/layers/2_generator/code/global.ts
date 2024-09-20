import { Code } from '../../../lib/Code.js'
import { hasCustomScalars } from '../../../lib/graphql.js'
import { createModuleGenerator } from '../createCodeGenerator.js'
import { moduleNameData } from './Data.js'
import { moduleNameScalar } from './Scalar.js'
import { moduleNameSchemaIndex } from './SchemaIndex.js'
import { moduleNameSelectMethods } from './SelectMethods.js'

export const { moduleName: moduleNameGlobal, generate: generateGlobal } = createModuleGenerator(
  `Global`,
  ({ config, code }) => {
    const StandardScalarNamespace = `StandardScalar`
    const needsDefaultCustomScalarImplementation = hasCustomScalars(config.typeMapByKind)
      && !config.options.customScalars

    code.push(
      `import type * as Data from './${moduleNameData}.js'`,
      `import type { $SelectMethods } from './${moduleNameSelectMethods}.js'`,
      `import type { Index } from './${moduleNameSchemaIndex}.js'`,
    )

    if (config.typeMapByKind.GraphQLScalarTypeCustom.length > 0) {
      code.push(`import type * as Scalar from './${moduleNameScalar}.js'`)
    }
    code.push(``)

    const defaultSchemaUrlTsDoc = config.defaultSchemaUrl
      ? `\n${Code.TSDoc(config.defaultSchemaUrl.href)}`
      : ``

    const customScalarsProperties = config.typeMapByKind.GraphQLScalarTypeCustom
      .map((_) => {
        return `${_.name}: ${
          needsDefaultCustomScalarImplementation ? `${StandardScalarNamespace}.String` : `Scalar.${_.name}`
        }`
      }).join(`\n`)

    code.push(`
      declare global {
        export namespace GraffleGlobalTypes {
          export interface Schemas {
            ${config.name}: {
              interfaces: {
                SelectMethods: $SelectMethods
              }
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
