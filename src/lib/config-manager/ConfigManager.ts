import type { IsUnknown, PartialDeep, Simplify } from 'type-fest'
import { isDate } from 'util/types'
import { type ExcludeUndefined, type GuardedType, isAnyFunction, isNonNullObject } from '../prelude.js'

// dprint-ignore
export type MergeDefaults<$Defaults extends object, $Input extends undefined | object, $CustomScalars> =
  $Input extends undefined
    ? $Defaults
    : {
        [$Key in keyof $Defaults]:
          $Key extends keyof $Input
            ? $Input[$Key] extends undefined
              ? $Defaults[$Key]
              : MergeDefaultsValues<$Defaults[$Key], ExcludeUndefined<$Input[$Key]>, $CustomScalars>
            : $Defaults[$Key]
      }

// dprint-ignore
type MergeDefaultsValues<$DefaultValue, $InputValue, $CustomScalars> =
$InputValue extends $CustomScalars
  ? $DefaultValue extends $CustomScalars
    ? $InputValue // Treat as terminal
    : never // Mismatch between defaults and input
  : $InputValue extends object
    ? $DefaultValue extends object
      ? Simplify<MergeDefaults<$DefaultValue, $InputValue, $CustomScalars>>
      : never // Defaults disagrees with Input
    : $InputValue

export const createMerger = <$CustomScalars extends CustomScalarGuard[]>(
  customScalars: $CustomScalars,
): MergeDefaultsFn<GuardedType<$CustomScalars[number]>> => {
  return (defaults, input) => mergeDefaults_(defaults, input, customScalars) as any
}

type MergeDefaultsFn<$CustomScalars> = <$Defaults extends object, $Input extends undefined | PartialDeep<$Defaults>>(
  defaults: $Defaults,
  input?: $Input,
) => Simplify<MergeDefaults<$Defaults, $Input, $CustomScalars>>

type MergeDefaultsInnerFn = (
  defaults: object,
  input: object | undefined,
  customScalars: CustomScalarGuard[],
) => object

type CustomScalarGuard = (value: object) => boolean

const isUrl = (value: object): value is URL => value instanceof URL

export const mergeDefaults = createMerger([isAnyFunction, isDate, isUrl])

const mergeDefaults_: MergeDefaultsInnerFn = (
  defaults,
  input,
  customScalars,
) => {
  if (input === undefined) {
    return defaults
  }

  const i = input as Record<string, any>
  const d = defaults as Record<string, any>

  for (const key in d) {
    const defaultValue = d[key]

    if (key in i && i[key] !== undefined) {
      const inputValue = i[key]
      if (isNonNullObject(defaultValue)) {
        if (isNonNullObject(inputValue)) {
          const isCustomScalar = customScalars.some(isCustomScalar => isCustomScalar(inputValue))
          if (!isCustomScalar) {
            mergeDefaults_(inputValue, defaultValue, customScalars)
          }
        } else {
          throw new Error(
            `Mismatch between defaults and input. Defaults expect an object at this node. Input was: ${
              String(inputValue)
            }`,
          )
        }
      }
    } else {
      i[key] = defaultValue
    }
  }

  return i
}

type Path = [...string[]]

export type ReadOrDefault<$Obj, $Path extends Path, $Default> = OrDefault<Read<$Obj, $Path>, $Default>

// dprint-ignore
export type OrDefault<$Value, $Default> =
    // When no value has been passed in, because the property is optional,
    // then the inferred type is unknown.
    IsUnknown<$Value> extends true ? $Default :
    $Value extends undefined       ? $Default :
                                     $Value

// dprint-ignore
export type Read<$Value, $Path extends [...string[]]> =
  $Value extends undefined ? undefined
  : $Path extends [infer P1 extends string, ...infer PN extends string[]] ?
   $Value extends object ?	P1 extends keyof $Value ? Read<$Value[P1], PN> : undefined
              : undefined
  : $Value

/**
 * Merge new properties from the second object into the first object.
 * If those properties already exist in the first object they will be overwritten.
 */
// dprint-ignore
export type SetProperties<$Object1 extends object, $Object2 extends object> =
    Simplify<Omit<$Object1, keyof $Object2> & $Object2>

export type SetProperty<$Obj extends object, $Prop extends keyof $Obj, $Type extends $Obj[$Prop]> =
  & Omit<$Obj, $Prop>
  & { [_ in $Prop]: $Type }

// dprint-ignore
export type Set<$Obj extends object, $Path extends Path, $Value> =
    Simplify<
      $Path extends []
        ? $Value extends object
          ? $Obj & $Value
          : never
        : Set_<$Obj, $Path, $Value>
    >

// dprint-ignore
export type Set_<$ObjOrValue, $Path extends Path, $Value> =
    Simplify<
      $Path extends [infer $P1 extends string, ...infer $PN extends string[]] ?
        $P1 extends keyof $ObjOrValue
            ? Omit<$ObjOrValue, $P1> & { [_ in $P1]: Set_<$ObjOrValue[$P1], $PN, $Value> }
            // If we use a nice error display here (like the following comment) it will mess with the result type in variable cases.
             // `Error: Cannot set value at path in object. Path property "${$P1}" does not exist in object.`
            : never
        : $Value
    >
