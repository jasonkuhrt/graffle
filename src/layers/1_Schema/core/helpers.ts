import type { Index } from './Index.js'

export type MaybeThunk<$Type> = $Type | Thunk<$Type>

export type Thunk<$Type> = () => $Type

export const readMaybeThunk = <T>(maybeThunk: MaybeThunk<T>): T =>
  // @ts-expect-error fixme
  typeof maybeThunk === `function` ? maybeThunk() : maybeThunk

export namespace Base {
  export interface Nullable<$Type> {
    kind: 'nullable'
    type: $Type
  }
  export interface List<$Type> {
    kind: 'list'
    type: $Type
  }
}

export type RootTypeName = keyof Index['Root']
