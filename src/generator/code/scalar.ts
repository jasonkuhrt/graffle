import type { Config } from './code.js'

export const generateScalar = (config: Config) => {
  let code = ``

  code += `
    import type * as CustomScalar from '${config.importPaths.customScalarCodecs}'

    export * from '${config.libraryPaths.scalars}'
    export * from '${config.importPaths.customScalarCodecs}'
    
    ${
    config.typeMapByKind.GraphQLCustomScalarType
      .map((_) => {
        return `export type ${_.name} = typeof CustomScalar.${_.name}`
      }).join(`\n`)
  }

    declare global {
      interface SchemaCustomScalars {
        ${
    config.typeMapByKind.GraphQLCustomScalarType
      .map((_) => {
        return `${_.name}: ${_.name}`
      }).join(`\n`)
  }
      }
    }

    

  `
  return code
}
