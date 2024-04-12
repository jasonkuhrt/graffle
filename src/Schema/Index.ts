import type { Object$, Union } from './__.js'

export interface Index {
  Root: {
    Query: null | Object$
    Mutation: null | Object$
    Subscription: null | Object$
  }
  objects: Record<string, Object$>
  unions: Record<string, Union>
}
