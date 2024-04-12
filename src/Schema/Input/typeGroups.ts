import type { Hybrid } from '../Hybrid/__.js'
import type { InputObject } from './types/InputObject.js'
import type { List } from './types/List.js'
import type { Nullable } from './types/Nullable.js'

export type Named = Hybrid.Enum | Hybrid.Scalar.Any | InputObject

export type Any = List<any> | Nullable<any> | Named
