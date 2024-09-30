import type { Hybrid } from '../Hybrid/__.js'
import type { InputObject } from './types/InputObject.js'
import type { List } from './types/List.js'
import type { Nullable } from './types/Nullable.js'

export type Named = Hybrid.Enum | Hybrid.Scalar.$Any | InputObject

export type Any = AnyExceptNull | Nullable<any>

export type AnyExceptNull = List<any> | Named
