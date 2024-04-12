import type { Enum, Scalar } from '../__.js'
import type { InputObject } from './types/InputObjet.js'
import type { List } from './types/List.js'
import type { Nullable } from './types/Nullable.js'

export type Any = List<any> | Nullable<any> | Enum | Scalar.Any | InputObject
