import { hasCustomScalars } from '../../../lib/graphql.js'
import { createModuleGenerator } from '../createCodeGenerator.js'
import { typeTitle2 } from '../helpers.js'

export const { generate: generateScalar, moduleName: moduleNameScalar } = createModuleGenerator(
  `Scalar`,
  ({ config, code }) => {
    // todo test case for when this is true
    const needsDefaultCustomScalarImplementation = hasCustomScalars(config.typeMapByKind)
      && !config.options.customScalars

    const CustomScalarsNamespace = `CustomScalars`
    const StandardScalarNamespace = `StandardScalar`

    if (needsDefaultCustomScalarImplementation) {
      code.push(`import * as ${StandardScalarNamespace} from '${config.libraryPaths.scalars}'`)
    }

    if (hasCustomScalars(config.typeMapByKind)) {
      code.push(`import type { Schema } from '${config.libraryPaths.schema}'`)
      code.push(`import * as ${CustomScalarsNamespace} from '${config.importPaths.customScalarCodecs}'`)
      code.push(``)
    }

    code.push(`export * from '${config.libraryPaths.scalars}'`)
    code.push(config.options.customScalars ? `export * from '${config.importPaths.customScalarCodecs}'` : ``)
    code.push(``)

    for (const scalar of config.typeMapByKind.GraphQLScalarTypeCustom) {
      code.push(typeTitle2(`custom scalar type`)(scalar))
      code.push(``)
      code.push(`export type ${scalar.name} = typeof ${CustomScalarsNamespace}.${scalar.name}`)
      code.push(`export type ${scalar.name}Decoded = Schema.Scalar.GetDecoded<${scalar.name}>`)
      code.push(`export type ${scalar.name}Encoded = Schema.Scalar.GetEncoded<${scalar.name}>`)
      code.push(``)
    }

    if (needsDefaultCustomScalarImplementation) {
      console.log(
        `WARNING: Custom scalars detected in the schema, but you have not created a custom scalars module to import implementations from.`,
      )
      code.push(
        config.typeMapByKind.GraphQLScalarTypeCustom
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
