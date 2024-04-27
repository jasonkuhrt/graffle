import type { GlobalRegistry } from '../../2_generator/globalRegistry.js'
import type { Output } from '../Output/__.js'

export interface Index {
  name: GlobalRegistry.SchemaNames
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
