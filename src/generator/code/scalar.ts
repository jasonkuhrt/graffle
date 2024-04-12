import type { Config } from './code.js'

export const generateScalar = (config: Config) => {
  let code = ``

  // todo test case for when this is true
  const needsDefaultCustomScalarImplementation = config.typeMapByKind.GraphQLScalarTypeCustom.length > 0
    && !config.options.customScalars

  code += `

  ${config.options.customScalars ? `import type * as CustomScalar from '${config.importPaths.customScalarCodecs}'` : ``}

    declare global {
      interface SchemaCustomScalars {
        ${
    config.typeMapByKind.GraphQLScalarTypeCustom
      .map((_) => {
        return `${_.name}: ${needsDefaultCustomScalarImplementation ? `String` : `CustomScalar.${_.name}`}`
      }).join(`\n`)
  }
      }
    }

    export * from '${config.libraryPaths.scalars}'
    ${config.options.customScalars ? `export * from '${config.importPaths.customScalarCodecs}'` : ``}
  `

  if (needsDefaultCustomScalarImplementation) {
    console.log(
      `WARNING: Custom scalars detected in the schema, but you have not created a custom scalars module to import implementations from.`,
    )
    code += `
${
      config.typeMapByKind.GraphQLScalarTypeCustom
        .flatMap((_) => {
          return [`export const ${_.name} = String`, `export type ${_.name} = String`]
        }).join(`\n`)
    }
    `
  }

  return code
}
