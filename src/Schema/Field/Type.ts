import type { TSError } from '../../lib/TSError.js'
import type { NamedType } from '../NamedType/__.js'
import type { Args, Field } from './Field.js'

const buildTimeOnly: any = undefined
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

export namespace Output {
  export interface __typename<$Type extends string = string> {
    kind: 'typename'
    type: $Type
  }

  export type Named = NamedType.AnyOutput

  export type Nullable<$Type extends Output.List<any> | __typename<any> | NamedType.AnyOutput> = Base.Nullable<$Type>

  export type List<$Type extends Any> = Base.List<$Type>

  export type Any = Output.List<any> | __typename<any> | Base.Nullable<any> | NamedType.AnyOutput

  export const __typename = <$Type extends string>(type: $Type): __typename<$Type> => ({ kind: `typename`, type })

  export const Nullable = <$Type extends __typename<any> | List<any> | NamedType.AnyOutput>(
    type: MaybeThunk<$Type>,
  ): Nullable<$Type> => ({
    kind: `nullable`,
    type,
  })

  export const List = <$Type extends Any>(type: $Type): List<$Type> => ({
    kind: `list`,
    type,
  })

  // todo extends any because of infinite depth issue in generated schema types
  // dprint-ignore
  export type Unwrap<$Type extends any> =
      $Type extends List<infer $innerType>      ? Unwrap<$innerType> :
      $Type extends Nullable<infer $innerType>  ? Unwrap<$innerType> :
      $Type extends __typename                  ? $Type['type'] :
      $Type extends NamedType.AnyOutput         ? $Type : 
                                                  TSError<'Unwrap', 'Unknown $Type', { $Type: $Type }>
  // dprint-ignore
  export type UnwrapNonNull<$Type> =
    $Type extends Nullable<infer $innerType>  ? UnwrapNonNull<$innerType>
                                              : $Type

  export const unwrapNonNull = <$Type extends Any>(type: $Type): UnwrapNonNull<$Type> => {
    if (type.kind === `nullable`) return type.type
    return type as UnwrapNonNull<$Type>
  }

  export const unwrap = <$Type extends Any>(type: $Type): Unwrap<$Type> => {
    console.log({ type })
    // @ts-expect-error fixme
    return type.kind === `named` ? type.type : unwrap(type.type)
  }

  export const field = <$Type extends Any, $Args extends null | Args = null>(
    type: MaybeThunk<$Type>,
    args: $Args = null as $Args,
  ): Field<$Type, $Args> => {
    return {
      typeUnwrapped: buildTimeOnly,
      type,
      args,
    }
  }

  export type Field<$Type extends any = any, $Args extends Args | null = Args | null> = {
    typeUnwrapped: Unwrap<$Type>
    type: $Type
    args: $Args
  }
}

export namespace Input {
  export type Nullable<$InnerType extends Any = Any> = Base.Nullable<$InnerType>
  export type List<$InnerType extends Any = Any> = Base.List<$InnerType>
  export type Any = List<any> | Nullable<any> | NamedType.AnyInput

  export const Nullable = <$InnerType extends Any>(type: MaybeThunk<$InnerType>): Nullable<$InnerType> => ({
    kind: `nullable`,
    type,
  })

  export const List = <$InnerType extends Any>(type: $InnerType): List<$InnerType> => ({
    kind: `list`,
    type,
  })

  export const field = <$Type extends Any, $Args extends Args | null = null>(type: $Type): Field<$Type> => {
    return {
      type,
    }
  }

  // dprint-ignore
  type UnwrapNonNull<$Type> =
    $Type extends Nullable<infer $innerType>  ? UnwrapNonNull<$innerType>
                                              : $Type

  export const unwrapNonNull = <$Type extends Any>(type: $Type): UnwrapNonNull<$Type> => {
    if (type.kind === `nullable`) return type.type
    return type as UnwrapNonNull<$Type>
  }
}

type MaybeThunk<$Type> = $Type | Thunk<$Type>

type Thunk<$Type> = () => $Type

export const readMaybeThunk = <T>(maybeThunk: MaybeThunk<T>): T =>
  typeof maybeThunk === `function` ? maybeThunk() : maybeThunk
