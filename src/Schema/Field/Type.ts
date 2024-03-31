import type { TSError } from '../../lib/TSError.js'
import type { NamedType } from '../NamedType/__.js'
import type { Args } from './Field.js'

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
  export type Nullable<$Type extends Any> = Base.Nullable<$Type>
  export type List<$Type extends Any> = Base.List<$Type>

  export type Any = Output.List<any> | __typename<any> | Base.Nullable<any> | NamedType.AnyOutput

  export const __typename = <$Type extends string>(type: $Type): __typename<$Type> => ({ kind: `typename`, type })

  export const Nullable = <$Type extends __typename<any> | List<any> | NamedType.AnyOutput>(
    type: MaybeThunk<$Type>,
  ): Nullable<$Type> => ({
    kind: `nullable`,
    type,
  })

  export const List = <$Type extends Any>(type: $Type): List<$Type> => ({ kind: `list`, type })

  // todo extends any because of infinite depth issue in generated schema types
  // dprint-ignore
  export type Unwrap<$Type extends any> =
      $Type extends List<infer $innerType>      ? Unwrap<$innerType> :
      $Type extends Nullable<infer $innerType>  ? Unwrap<$innerType> :
      $Type extends __typename                  ? $Type['type'] :
      $Type extends NamedType.AnyOutput         ? $Type : 
                                                  TSError<'Unwrap', 'Unknown $Type', { $Type: $Type }>

  export const unwrap = <$Type extends Any>(type: $Type): Unwrap<$Type> => {
    // @ts-expect-error fixme
    return type.kind === `named` ? type.type : unwrap(type.type)
  }

  export const field = <$Type extends Any, $Args extends null | Args = null>(
    type: MaybeThunk<$Type>,
    args: $Args = null as $Args,
  ): Field<$Type, $Args> => {
    return {
      // eslint-disable-next-line
      // @ts-ignore infinite depth issue, can this be fixed?
      typeUnwrapped: Type.Output.unwrap(type),
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
}

type MaybeThunk<$Type> = $Type | Thunk<$Type>

type Thunk<$Type> = () => $Type
