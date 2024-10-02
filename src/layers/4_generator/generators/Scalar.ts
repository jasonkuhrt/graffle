import { hasCustomScalars } from '../../../lib/graphql-plus/graphql.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { typeTitle2 } from '../helpers/render.js'

export const ModuleGeneratorScalar = createModuleGenerator(
  `Scalar`,
  ({ config, code }) => {
    // todo test case for when this is true
    const needsDefaultCustomScalarImplementation = hasCustomScalars(config.schema.typeMapByKind)
      && !config.options.customScalars

    const CustomScalarsNamespace = `CustomScalars`
    const StandardScalarNamespace = `StandardScalar`

    if (needsDefaultCustomScalarImplementation) {
      code(`import * as ${StandardScalarNamespace} from '${config.paths.imports.grafflePackage.scalars}'`)
    }

    if (hasCustomScalars(config.schema.typeMapByKind)) {
      code(`import type { Schema } from '${config.paths.imports.grafflePackage.schema}'`)
      code(`import * as ${CustomScalarsNamespace} from '${config.paths.imports.customScalarCodecs}'`)
      code()
    }

    code(`export * from '${config.paths.imports.grafflePackage.scalars}'`)
    if (config.options.customScalars) {
      code(`export * from '${config.paths.imports.customScalarCodecs}'`)
      const names = config.schema.typeMapByKind.GraphQLScalarTypeCustom.map((scalar) => scalar.name)
      code(`export { ${names.join(`, `)} } from '${config.paths.imports.customScalarCodecs}'`)
    }
    code()

    for (const scalar of config.schema.typeMapByKind.GraphQLScalarTypeCustom) {
      code(typeTitle2(`custom scalar type`)(scalar))
      code()
      code(`export type ${scalar.name} = typeof ${CustomScalarsNamespace}.${scalar.name}`)
      code(
        `// Without this we get error:
         // "Exported type alias 'DateDecoded' has or is using private name 'Date'."`,
      )
      code(`type ${scalar.name}_ = typeof ${CustomScalarsNamespace}.${scalar.name}`)
      code(`export type ${scalar.name}Decoded = Schema.Scalar.GetDecoded<${scalar.name}_>`)
      code(`export type ${scalar.name}Encoded = Schema.Scalar.GetEncoded<${scalar.name}_>`)
      code()
    }

    if (needsDefaultCustomScalarImplementation) {
      console.log(
        `WARNING: Custom scalars detected in the schema, but you have not created a custom scalars module to import implementations from.`,
      )
      code(
        config.schema.typeMapByKind.GraphQLScalarTypeCustom
          .flatMap((_) => {
            return [
              `export const ${_.name} = ${StandardScalarNamespace}.String`,
              `export type ${_.name} = ${StandardScalarNamespace}.String`,
            ]
          }).join(`\n`),
      )
    }
  },
)
