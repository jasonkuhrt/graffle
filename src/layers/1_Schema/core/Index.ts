import type { RootTypeName } from '../../../lib/graphql.js'
import type { GlobalRegistry } from '../../4_generator/globalRegistry.js'
import type { Hybrid } from '../Hybrid/__.js'
import type { Output } from '../Output/__.js'

/**
 * A generic schema index type. Any particular schema index will be a subtype of this, with
 * additional specificity such as on objects where here `Record` is used.
 */
// todo make all readonly?
export interface Index {
  name: GlobalRegistry.SchemaNames
  RootTypesPresent: readonly RootTypeName[]
  RootUnion: Output.RootType
  Root: {
    Query: null | Output.ObjectQuery
    Mutation: null | Output.ObjectMutation
    Subscription: null | Output.ObjectSubscription
  }

  allTypes: Record<
    string,
    | Hybrid.Enum
    | Output.ObjectQuery
    | Output.ObjectMutation
    | Output.Object$2
    | Output.Union
    | Output.Interface
  >
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
