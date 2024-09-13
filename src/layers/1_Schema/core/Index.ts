import type { RootTypeName } from '../../../lib/graphql.js'
import type { GlobalRegistry } from '../../2_generator/globalRegistry.js'
import type { Output } from '../Output/__.js'

/**
 * A generic schema index type. Any particular schema index will be a subtype of this, with
 * additional specificity such as on objects where here `Record` is used.
 */
// todo make all readonly?
export interface Index {
  name: GlobalRegistry.SchemaNames
  RootTypesPresent: readonly RootTypeName[]
  Root: {
    Query: null | Output.Object$2
    Mutation: null | Output.Object$2
    Subscription: null | Output.Object$2
  }
  objects: Record<string, Output.Object$2>
  unions: Record<string, Output.Union>
  interfaces: Record<string, Output.Interface>
  error: {
    objects: Record<string, Output.Object$2>
    objectsTypename: Record<string, { __typename: string }>
    rootResultFields: {
      Query: Record<string, string>
      Mutation: Record<string, string>
      Subscription: Record<string, string>
    }
  }
}
