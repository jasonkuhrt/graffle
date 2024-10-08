import { Code } from '../../../lib/Code.js'
import { Grafaid } from '../../../lib/grafaid/__.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { ModuleGeneratorData } from './Data.js'
import { ModuleGeneratorMethodsDocument } from './MethodsDocument.js'
import { ModuleGeneratorMethodsRoot } from './MethodsRoot.js'
import { ModuleGeneratorMethodsSelect } from './MethodsSelect.js'
import { ModuleGeneratorScalar } from './Scalar.js'
import { ModuleGeneratorSchemaIndex } from './SchemaIndex.js'

export const ModuleGeneratorGlobal = createModuleGenerator(
  `Global`,
  ({ config, code }) => {
    const StandardScalarNamespace = `StandardScalar`
    const needsDefaultCustomScalarImplementation = Grafaid.Schema.KindMap.hasCustomScalars(config.schema.typeMapByKind)
      && !config.options.customScalars

    code(
      `import type * as Data from './${ModuleGeneratorData.name}.js'`,
      `import type * as MethodsSelect from './${ModuleGeneratorMethodsSelect.name}.js'`,
      `import type * as MethodsDocument from './${ModuleGeneratorMethodsDocument.name}.js'`,
      `import type * as MethodsRoot from './${ModuleGeneratorMethodsRoot.name}.js'`,
      `import type { Index } from './${ModuleGeneratorSchemaIndex.name}.js'`,
    )

    if (config.schema.typeMapByKind.GraphQLScalarTypeCustom.length > 0) {
      code(`import type * as Scalar from './${ModuleGeneratorScalar.name}.js'`)
    }
    code()

    const defaultSchemaUrlTsDoc = config.options.defaultSchemaUrl
      ? `\n${Code.TSDoc(config.options.defaultSchemaUrl.href)}`
      : ``

    const customScalarsProperties = config.schema.typeMapByKind.GraphQLScalarTypeCustom
      .map((_) => {
        return `${_.name}: ${
          needsDefaultCustomScalarImplementation ? `${StandardScalarNamespace}.String` : `Scalar.${_.name}`
        }`
      }).join(`\n`)

    code(`
      declare global {
        export namespace GraffleGlobalTypes {
          export interface Schemas {
            ${config.name}: {
              name: Data.Name
              index: Index
              interfaces: {
                MethodsSelect: MethodsSelect.$MethodsSelect
                Document: MethodsDocument.BuilderMethodsDocumentFn
                Root: MethodsRoot.BuilderMethodsRootFn
              }
              customScalars: {
                ${customScalarsProperties}
              }
              //schemaCustomScalarsIndex: SchemaCustomScalarIndex
              featureOptions: {
                schemaErrors: ${config.options.errorTypeNamePattern ? `true` : `false`}
              }${defaultSchemaUrlTsDoc}
              defaultSchemaUrl: ${config.options.defaultSchemaUrl ? `string` : `null`}
          }
        }
      }
    }
  `)

    return code
  },
)
