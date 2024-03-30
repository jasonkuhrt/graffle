/* eslint-disable @typescript-eslint/ban-types */

import type { Object, Union } from './__.js'

export interface Index {
  Root: {
    Query: null | Object
    Mutation: null | Object
    Subscription: null | Object
  }
  objects: Record<string, Object>
  unions: {
    Union: null | Union
  }
}
