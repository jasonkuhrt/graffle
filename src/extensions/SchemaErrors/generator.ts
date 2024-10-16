import { createGeneratorExtension } from '../../entrypoints/extensionkit.js'
import type { Config as GeneratorConfig } from '../../layers/4_generator/config.js'
import { ConfigManager } from '../../lib/config-manager/__.js'
import { Grafaid } from '../../lib/grafaid/__.js'

const propertyNames = {
  r: `r`,
  e: `e`,
}

declare global {
  interface GraffleSchemaDriveDataMapOutputObject {
    /**
     * Indicates that this object represents an error type.
     */
    e?: 1
  }
  interface GraffleSchemaDriveDataMapOutputField {
    /**
     * Indicates that this is a "result field".
     */
    r?: 1
  }
}

interface Input {
  isErrorType?: (value: Grafaid.Schema.ObjectType) => boolean
}

const defaultErrorTypeNamePattern = /^Error/

interface Config {
  isErrorType: (value: Grafaid.Schema.ObjectType) => boolean
}

const defaults: Config = {
  isErrorType: (_ => Boolean(_.name.match(defaultErrorTypeNamePattern))),
}

export const generator = (input: Input) => {
  const config = ConfigManager.mergeDefaults(defaults, input)

  return createGeneratorExtension({
    name: `SchemaErrors`,
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
  return Object.values(genConfig.schema.typeMapByKind.GraphQLObjectType).filter(config.isErrorType)
}

// .parametersExclusive(
//   `schemaErrorType`,
//   $ =>
//     $.parameter(
//       `schemaErrorTypes`,
//       z.boolean().describe(
//         `Use the schema error types pattern. All object types whose name starts with "Error" will be considered to be error types. If you want to specify a custom name pattern then use the other parameter "schemaErrorTypePattern".`,
//       ),
//     )
//       .parameter(
//         `schemaErrorTypePattern`,
//         z.string().min(1).describe(
//           `Designate objects whose name matches this JS regular expression as being error types in your schema.`,
//         ),
//       ).default(`schemaErrorTypes`, true),
// )

// errorTypeNamePattern: args.schemaErrorType._tag === `schemaErrorTypePattern`
//     ? new RegExp(args.schemaErrorType.value)
//     : args.schemaErrorType.value
//     ? /^Error.+/
//     : undefined,
