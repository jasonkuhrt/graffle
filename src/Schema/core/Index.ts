import type { Output } from '../Output/__.js'

export interface Index {
  Root: {
    Query: null | Output.Object$2
    Mutation: null | Output.Object$2
    Subscription: null | Output.Object$2
  }
  objects: Record<string, Output.Object$2>
  // todo unused?
  unions: Record<string, Output.Union>
}
