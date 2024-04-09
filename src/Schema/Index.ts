/* eslint-disable @typescript-eslint/ban-types */

import type { Obj, Union } from './__.js'

export interface Index {
  Root: {
    Query: null | Obj
    Mutation: null | Obj
    Subscription: null | Obj
  }
  objects: Record<string, Obj>
  unions: Record<string, Union>
}
