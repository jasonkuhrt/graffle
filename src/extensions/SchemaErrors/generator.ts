import { createGeneratorExtension } from '../../entrypoints/extensionkit.js'
import type { Config as GeneratorConfig } from '../../layers/4_generator/config/config.js'
import { Code } from '../../lib/Code.js'
import { ConfigManager } from '../../lib/config-manager/__.js'
import { Grafaid } from '../../lib/grafaid/__.js'

declare global {
  namespace GraffleGlobal {
    interface Schema {
      SchemaErrors: {
        objectNames: string
      }
    }
    namespace SchemaDrivenDataMap {
      interface OutputObject {
        /**
         * Is this output object an error object?
         */
        e?: 1
      }
      interface OutputField {
        /**
         * Is this output field a result field?
         */
        r?: 1
      }
    }
  }
}

const propertyNames = {
  r: `r`,
  e: `e`,
}

interface Input {
  isErrorType?: (value: Grafaid.Schema.ObjectType) => boolean
}

interface Config {
  isErrorType: (value: Grafaid.Schema.ObjectType) => boolean
}

const defaults: Config = {
  isErrorType: (_ => Boolean(_.name.match(defaultErrorTypeNamePattern))),
}

const defaultErrorTypeNamePattern = /^Error.+/

export const SchemaErrors = (input?: Input) => {
  const config = ConfigManager.mergeDefaults(defaults, input ?? {})

  return createGeneratorExtension({
    name: `SchemaErrors`,
    onSchema: ({ config: genConfig, schema }) => {
      const errorObjects = getErrorObjects(config, genConfig)
      schema[`SchemaErrors`] = {
        objectNames: errorObjects.map(_ => Code.string(_.name)).join(` | `),
      }
    },
    schemaDrivenDataMap: {
      onObjectType: ({ config: genConfig, sddmNode, graphqlType }) => {
        const errorObjects = getErrorObjects(config, genConfig)

        if (errorObjects.find(_ => _.name === graphqlType.name)) {
          sddmNode[propertyNames.e] = 1
        }
      },
      onOutputField: ({ config: genConfig, sddmNode, graphqlType }) => {
        const errorObjects = getErrorObjects(config, genConfig)
        const outputFieldNamedType = Grafaid.Schema.getNamedType(graphqlType.type)
        const memberTypes = Grafaid.Schema.isUnionType(outputFieldNamedType) ? outputFieldNamedType.getTypes() : null

        if (memberTypes && errorObjects.find(_ => memberTypes.find(__ => __.name === _.name))) {
          sddmNode.$fields[propertyNames.r] = 1
        }
      },
    },
  })
}

// todo memoize
const getErrorObjects = (config: Config, genConfig: GeneratorConfig) => {
  return Object.values(genConfig.schema.kindMap.GraphQLObjectType).filter(config.isErrorType)
}
