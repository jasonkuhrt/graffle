 

import type { Object$2, Union } from './__.js'

export interface Index {
  Root: {
    Query: null | Object$2
    Mutation: null | Object$2
    Subscription: null | Object$2
  }
  objects: Record<string, Object$2>
  unions: Record<string, Union>
}
