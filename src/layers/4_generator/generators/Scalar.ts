import { Grafaid } from '../../../lib/grafaid/__.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { typeTitle2 } from '../helpers/render.js'

export const ModuleGeneratorScalar = createModuleGenerator(
  `Scalar`,
  ({ config, code }) => {
    const identifiers = {
      CustomScalars: `CustomScalars`,
      StandardScalar: `StandardScalar`,
    }

    // todo test case for when this is true
    const isNeedCustomScalarDefaults = Grafaid.Schema.KindMap.hasCustomScalars(config.schema.kindMap)
      && !config.options.customScalars

    code(`import type { SchemaKit } from '${config.paths.imports.grafflePackage.schema}'`)
    code()

    if (Grafaid.Schema.KindMap.hasCustomScalars(config.schema.kindMap) && config.options.customScalars) {
      code(`import * as ${identifiers.CustomScalars} from '${config.paths.imports.customScalarCodecs}'`)
      code()
      code(`export * from '${config.paths.imports.customScalarCodecs}'`)
      const names = config.schema.kindMap.GraphQLScalarTypeCustom.map((scalar) => scalar.name).join(`, `)
      code(`export { ${names} } from '${config.paths.imports.customScalarCodecs}'`)
      for (const scalar of config.schema.kindMap.GraphQLScalarTypeCustom) {
        code(typeTitle2(`custom scalar type`)(scalar))
        code()
        code(`export type ${scalar.name} = typeof ${identifiers.CustomScalars}.${scalar.name}`)
        code(`
          // Without this we get error:
          // "Exported type alias 'DateDecoded' has or is using private name 'Date'."
        `)
        code(`type ${scalar.name}_ = typeof ${identifiers.CustomScalars}.${scalar.name}`)
        code(`export type ${scalar.name}Decoded = SchemaKit.Scalar.GetDecoded<${scalar.name}_>`)
        code(`export type ${scalar.name}Encoded = SchemaKit.Scalar.GetEncoded<${scalar.name}_>`)
        code()
      }
    }

    code(`export * from '${config.paths.imports.grafflePackage.scalars}'`)
    code()

    if (isNeedCustomScalarDefaults) {
      if (config.lint.missingCustomScalarCodec) {
        console.log(
          `WARNING: Custom scalars detected in the schema, but you have not created a custom scalars module to import implementations from.`,
        )
      }

      for (const scalar of config.schema.kindMap.GraphQLScalarTypeCustom) {
        code(typeTitle2(`custom scalar type`)(scalar))
        code()
        code(`import type { String as ${scalar.name} } from '${config.paths.imports.grafflePackage.scalars}'`)
        code()
        code(`export { String as ${scalar.name} } from '${config.paths.imports.grafflePackage.scalars}'`)
        code(`export type ${scalar.name}Decoded = SchemaKit.Scalar.GetDecoded<${scalar.name}>`)
        code(`export type ${scalar.name}Encoded = SchemaKit.Scalar.GetEncoded<${scalar.name}>`)
        code()
      }
    }
  },
)
