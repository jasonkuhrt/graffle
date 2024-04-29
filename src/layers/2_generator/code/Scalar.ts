import { createCodeGenerator } from '../createCodeGenerator.js'

export const { generate: generateScalar, moduleName: moduleNameScalar } = createCodeGenerator(
  `Scalar`,
  (config) => {
    let code = ``

    // todo test case for when this is true
    const needsDefaultCustomScalarImplementation = config.typeMapByKind.GraphQLScalarTypeCustom.length > 0
      && !config.options.customScalars

    const StandardScalarNamespace = `StandardScalar`
    code += `

  ${
      needsDefaultCustomScalarImplementation
        ? `import * as ${StandardScalarNamespace} from '${config.libraryPaths.scalars}'`
        : ``
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
            return [
              `export const ${_.name} = ${StandardScalarNamespace}.String`,
              `export type ${_.name} = ${StandardScalarNamespace}.String`,
            ]
          }).join(`\n`)
      }
    `
    }

    return code
  },
)
