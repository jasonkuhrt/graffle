import type { Config } from './code.js'

export const generateScalar = (config: Config) => {
  let code = ``

  code += `
    import type * as CustomScalar from '${config.importPaths.customScalarCodecs}'

    declare global {
      interface SchemaCustomScalars {
        ${
    config.typeMapByKind.GraphQLScalarTypeCustom
      .map((_) => {
        return `${_.name}: CustomScalar.${_.name}`
      }).join(`\n`)
  }
      }
    }

    export * from '${config.libraryPaths.scalars}'
    export * from '${config.importPaths.customScalarCodecs}'
  `
  return code
}
