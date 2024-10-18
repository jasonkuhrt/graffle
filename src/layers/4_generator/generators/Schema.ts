import type { SchemaDrivenDataMap } from '../../../entrypoints/utilities-for-generated.js'
import { Code } from '../../../lib/Code.js'
import { Grafaid } from '../../../lib/grafaid/__.js'
import type { SchemaKit } from '../../1_Schema/__.js'
import type { GlobalRegistry } from '../globalRegistry.js'
import { createModuleGenerator } from '../helpers/moduleGenerator.js'
import { ModuleGeneratorData } from './Data.js'
import { ModuleGeneratorMethodsRoot } from './MethodsRoot.js'
import { ModuleGeneratorSchemaBuildtime } from './SchemaBuildtime.js'

// todo: consider removing global approach since it doesn't play well with multiple schemas
// declare global {
//   namespace GraffleGlobal {
//     /**
//      * A generic schema index type. Any particular schema index will be a subtype of this, with
//      * additional specificity such as on objects where here `Record` is used.
//      */
//     export interface Schema<
//       $Extensions extends GlobalRegistry.TypeExtensions = GlobalRegistry.TypeExtensions,
//     > {
//       name: GlobalRegistry.SchemaNames
//       RootTypesPresent: ('Query' | 'Mutation' | 'Subscription')[]
//       RootUnion: SchemaKit.Output.RootType
//       Root: {
//         Query: null | SchemaKit.Output.ObjectQuery
//         Mutation: null | SchemaKit.Output.ObjectMutation
//         Subscription: null | SchemaKit.Output.ObjectSubscription
//       }
//       allTypes: Record<
//         string,
//         | SchemaKit.Hybrid.Enum
//         | SchemaKit.Output.ObjectQuery
//         | SchemaKit.Output.ObjectMutation
//         | SchemaKit.Output.Object$2
//         | SchemaKit.Output.Union
//         | SchemaKit.Output.Interface
//       >
//       objects: Record<string, SchemaKit.Output.Object$2>
//       unions: Record<string, SchemaKit.Output.Union>
//       interfaces: Record<string, SchemaKit.Output.Interface>
//       customScalars: {
//         input: SchemaDrivenDataMap
//       }
//       extensions: $Extensions
//     }
//   }
// }

// export type Schema<
//   $Extensions extends GlobalRegistry.TypeExtensions = GlobalRegistry.TypeExtensions,
// > = GraffleGlobal.Schema<$Extensions>

/**
 * A generic schema type. Any particular schema will be a subtype of this, with
 * additional specificity such as on objects where here `Record` is used.
 */
export interface Schema<
  $Extensions extends GlobalRegistry.TypeExtensions = GlobalRegistry.TypeExtensions,
> {
  name: GlobalRegistry.SchemaNames
  RootTypesPresent: ('Query' | 'Mutation' | 'Subscription')[]
  RootUnion: SchemaKit.Output.RootType
  Root: {
    Query: null | SchemaKit.Output.ObjectQuery
    Mutation: null | SchemaKit.Output.ObjectMutation
    Subscription: null | SchemaKit.Output.ObjectSubscription
  }
  allTypes: Record<
    string,
    | SchemaKit.Hybrid.Enum
    | SchemaKit.Output.ObjectQuery
    | SchemaKit.Output.ObjectMutation
    | SchemaKit.Output.Object$2
    | SchemaKit.Output.Union
    | SchemaKit.Output.Interface
  >
  objects: Record<string, SchemaKit.Output.Object$2>
  unions: Record<string, SchemaKit.Output.Union>
  interfaces: Record<string, SchemaKit.Output.Interface>
  customScalars: {
    input: SchemaDrivenDataMap
  }
  extensions: $Extensions
}

const identifiers = {
  Utilities: `Utilities`,
}

export const ModuleGeneratorSchema = createModuleGenerator(
  `Schema`,
  ({ config, code }) => {
    const SchemaBuildtimeNamespace = `Schema`
    const MethodsRootNamespace = `MethodsRoot`
    code(`/* eslint-disable */`)
    code(`
      import type * as Data from './${ModuleGeneratorData.name}.js'
      import type * as ${SchemaBuildtimeNamespace} from './${ModuleGeneratorSchemaBuildtime.name}.js'
      import type * as ${MethodsRootNamespace} from './${ModuleGeneratorMethodsRoot.name}.js'
      import type * as ${identifiers.Utilities} from '${config.paths.imports.grafflePackage.utilitiesForGenerated}'
    `)
    code()

    const rootTypesPresence = {
      Query: Grafaid.Schema.KindMap.hasQuery(config.schema.kindMap),
      Mutation: Grafaid.Schema.KindMap.hasMutation(config.schema.kindMap),
      Subscription: Grafaid.Schema.KindMap.hasSubscription(config.schema.kindMap),
    }

    const root = config.schema.kindMap.GraphQLRootType.map(_ =>
      [_.name, `${SchemaBuildtimeNamespace}.Root.${_.name}`] as const
    )

    const objects = config.schema.kindMap.GraphQLObjectType.map(_ =>
      [_.name, `${SchemaBuildtimeNamespace}.Object.${_.name}`] as const
    )
    const unions = config.schema.kindMap.GraphQLUnionType.map(_ =>
      [_.name, `${SchemaBuildtimeNamespace}.Union.${_.name}`] as const
    )
    const interfaces = config.schema.kindMap.GraphQLInterfaceType.map(
      _ => [_.name, `${SchemaBuildtimeNamespace}.Interface.${_.name}`] as const,
    )
    const enums = config.schema.kindMap.GraphQLEnumType.map(
      _ => [_.name, `${SchemaBuildtimeNamespace}.Enum.${_.name}`] as const,
    )

    const schema: Code.TermObject = {
      name: `Data.Name`,
      RootTypesPresent: `[${config.schema.kindMap.GraphQLRootType.map((_) => Code.string(_.name)).join(`, `)}]`,
      RootUnion: config.schema.kindMap.GraphQLRootType.map(_ => `${SchemaBuildtimeNamespace}.Root.${_.name}`)
        .join(`|`),
      Root: {
        Query: rootTypesPresence.Query ? `${SchemaBuildtimeNamespace}.Root.Query` : null,
        Mutation: rootTypesPresence.Mutation ? `${SchemaBuildtimeNamespace}.Root.Mutation` : null,
        Subscription: rootTypesPresence.Subscription ? `${SchemaBuildtimeNamespace}.Root.Subscription` : null,
      },
      allTypes: Code.objectFromEntries([
        ...root,
        ...enums,
        ...objects,
        ...unions,
        ...interfaces,
      ]),
      objects: Code.objectFromEntries(objects),
      unions: Code.objectFromEntries(unions),
      interfaces: Code.objectFromEntries(interfaces),
      customScalars: `${identifiers.Utilities}.SchemaIndexBase['customScalars']`,
      extensions: `Utilities.GlobalRegistry.TypeExtensions`,
    }

    // --- Extensions ---
    // If the extensions object is populated it will override the default generic type.

    const extensions: Code.TermObject = {}

    config.extensions.forEach(_ => {
      _.onSchema?.({ config, schema: extensions })
    })
    if (!isObjectEmpty(extensions)) {
      schema[`extensions`] = extensions
    }

    // ---

    code(
      `export interface Index extends Utilities.SchemaIndexBase
        ${Code.termObject(schema)}
      `,
    )

    return code
  },
)

const isObjectEmpty = (object: Record<string, unknown>) => {
  return Object.keys(object).length === 0
}
