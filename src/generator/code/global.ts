import type { Config } from './generateCode.js'
import { moduleNameIndex } from './Index.js'

export const moduleNameGlobal = `Global`

export const generateGlobal = (config: Config) => {
  const StandardScalarNamespace = `StandardScalar`
  const needsDefaultCustomScalarImplementation = config.typeMapByKind.GraphQLScalarTypeCustom.length > 0
    && !config.options.customScalars

  const code: string[] = []

  code.push(
    `import { Index } from './${moduleNameIndex}.js'`,
  )

  if (config.typeMapByKind.GraphQLScalarTypeCustom.length > 0) {
    code.push(
      `import type * as CustomScalar from '${config.importPaths.customScalarCodecs}'`,
    )
  }

  code.push(`
    declare global {
      interface NamedSchemas {
        ${config.name}: {
          index: Index
          customScalars: {
            ${
    config.typeMapByKind.GraphQLScalarTypeCustom
      .map((_) => {
        return `${_.name}: ${
          needsDefaultCustomScalarImplementation ? `${StandardScalarNamespace}.String` : `CustomScalar.${_.name}`
        }`
      }).join(`\n`)
  }
        }
      }
    }
  }
  `)

  return {
    code: code.join(`\n\n`),
    moduleName: moduleNameGlobal,
  }
}
