import type { Hybrid } from '../Hybrid/__.js'
import type { Enum } from '../Hybrid/types/Enum.js'
import type { __typename } from './types/__typename.js'
import type { Interface } from './types/Interface.js'
import type { List } from './types/List.js'
import type { Nullable } from './types/Nullable.js'
import type { Object$2 } from './types/Object.js'
import type { Union } from './types/Union.js'

export type Named = Interface | Enum | Object$2 | Union | Hybrid.Scalar.Any

export type Unnamed = List<any> | __typename<any> | Nullable<any>

export type Any = Unnamed | Named
