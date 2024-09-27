import { hasCustomScalars } from '../../../lib/graphql.js'
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
      code.push(`import * as ${StandardScalarNamespace} from '${config.paths.imports.grafflePackage.scalars}'`)
    }

    if (hasCustomScalars(config.schema.typeMapByKind)) {
      code.push(`import type { Schema } from '${config.paths.imports.grafflePackage.schema}'`)
      code.push(`import * as ${CustomScalarsNamespace} from '${config.paths.imports.customScalarCodecs}'`)
      code.push(``)
    }

    code.push(`export * from '${config.paths.imports.grafflePackage.scalars}'`)
    if (config.options.customScalars) {
      code.push(`export * from '${config.paths.imports.customScalarCodecs}'`)
      const names = config.schema.typeMapByKind.GraphQLScalarTypeCustom.map((scalar) => scalar.name)
      code.push(`export { ${names.join(`, `)} } from '${config.paths.imports.customScalarCodecs}'`)
    }
    code.push(``)

    for (const scalar of config.schema.typeMapByKind.GraphQLScalarTypeCustom) {
      code.push(typeTitle2(`custom scalar type`)(scalar))
      code.push(``)
      code.push(`export type ${scalar.name} = typeof ${CustomScalarsNamespace}.${scalar.name}`)
      code.push(
        `// Without this we get error:
         // "Exported type alias 'DateDecoded' has or is using private name 'Date'."`,
      )
      code.push(`type ${scalar.name}_ = typeof ${CustomScalarsNamespace}.${scalar.name}`)
      code.push(`export type ${scalar.name}Decoded = Schema.Scalar.GetDecoded<${scalar.name}_>`)
      code.push(`export type ${scalar.name}Encoded = Schema.Scalar.GetEncoded<${scalar.name}_>`)
      code.push(``)
    }

    if (needsDefaultCustomScalarImplementation) {
      console.log(
        `WARNING: Custom scalars detected in the schema, but you have not created a custom scalars module to import implementations from.`,
      )
      code.push(
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
