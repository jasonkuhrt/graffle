import type { IsUnknown, Simplify } from 'type-fest'

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
