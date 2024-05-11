import type { ConditionalSimplifyDeep } from 'type-fest/source/conditional-simplify.js'

/* eslint-disable */
export type RemoveIndex<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
}

export const uppercase = <S extends string>(str: S): Uppercase<S> => str.toUpperCase() as Uppercase<S>

export const callOrIdentity = <T>(value: MaybeLazy<T>) => {
  return typeof value === `function` ? (value as () => T)() : value
}

export type MaybeLazy<T> = T | (() => T)

export const zip = <A, B>(a: A[], b: B[]): [A, B | undefined][] => a.map((k, i) => [k, b[i]])

export const HeadersInitToPlainObject = (headers?: HeadersInit): Record<string, string> => {
  let oHeaders: Record<string, string> = {}

  if (headers instanceof Headers) {
    oHeaders = HeadersInstanceToPlainObject(headers)
  } else if (Array.isArray(headers)) {
    headers.forEach(([name, value]) => {
      if (name && value !== undefined) {
        oHeaders[name] = value
      }
    })
  } else if (headers) {
    oHeaders = headers
  }

  return oHeaders
}

export const HeadersInstanceToPlainObject = (headers: Response['headers']): Record<string, string> => {
  const o: Record<string, string> = {}
  headers.forEach((v, k) => {
    o[k] = v
  })
  return o
}

export const tryCatch = <$Return, $Throw extends Error = Error>(
  fn: () => $Return,
): $Return extends Promise<any> ? Promise<Awaited<$Return> | $Throw> : $Return | $Throw => {
  try {
    const result = fn() as any
    if (isPromiseLikeValue(result)) {
      return result.catch((error) => {
        return errorFromMaybeError(error)
      }) as any
    }
    return result
  } catch (error) {
    return errorFromMaybeError(error) as any
  }
}

/**
 * Ensure that the given value is an error and return it. If it is not an error than
 * wrap it in one, passing the given value as the error message.
 */
export const errorFromMaybeError = (maybeError: unknown): Error => {
  if (maybeError instanceof Error) return maybeError
  return new Error(String(maybeError))
}

export const isPromiseLikeValue = (value: unknown): value is Promise<unknown> => {
  return (
    typeof value === `object`
    && value !== null
    && `then` in value
    && typeof value.then === `function`
    && `catch` in value
    && typeof value.catch === `function`
    && `finally` in value
    && typeof value.finally === `function`
  )
}

export const casesExhausted = (value: never): never => {
  throw new Error(`Unhandled case: ${String(value)}`)
}

export const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === `object` && value !== null && !Array.isArray(value)
}

export const entries = <T extends Record<string, any>>(obj: T) => Object.entries(obj) as [keyof T, T[keyof T]][]

export const values = <T extends Record<string, unknown>>(obj: T): T[keyof T][] => Object.values(obj) as T[keyof T][]

// dprint-ignore
export type Exact<$Value, $Constraint> =
  (
    $Value extends unknown  ? $Constraint extends $Value   ?  {} extends $Value    ?  $Constraint :
                                                                                      { [K in keyof $Value]: Exact<$Value[K], $Constraint[K]> } :
                                                              $Constraint :
                              never
  )
  | ($Value extends Narrowable ? $Value : never)

// dprint-ignore
// export type ExactObjectNonEmpty<$Value, $Constraint> =
//   (
//     $Value extends unknown  ? $Constraint extends $Value   ?  keyof $Value extends never  ? ({ 'TypeScript Error: You must supply at least one key.': true } & $Constraint)  :
//                                                                                             { [K in keyof $Value]: Exact<$Value[K], $Constraint[K]> } :
//                                                               $Constraint :
//                               never
//   )
//   | ($Value extends Narrowable ? $Value : never)

export type Narrowable = string | number | bigint | boolean | []

export type Letter = LetterLower | LetterUpper

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

export type LetterLower =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
export type LetterUpper =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'

export type StringNonEmpty = `${Letter}${string}`

export type MaybeList<T> = T | T[]

export type NotEmptyObject<T> = keyof T extends never ? never : T

export type Values<T> = T[keyof T]

export type GetKeyOr<T, Key, Or> = Key extends keyof T ? T[Key] : Or

export type SimplifyDeep<T> = ConditionalSimplifyDeep<T, Function | Iterable<unknown> | Date, object>

export type As<T, U> = U extends T ? U : never

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

export type LastOf<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer R ? R : never

// TS4.0+
export type Push<T extends any[], V> = [...T, V]

// TS4.1+
export type UnionToTuple<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N ? []
  : Push<UnionToTuple<Exclude<T, L>>, L>

export type CountKeys<T> = keyof T extends never ? 0 : UnionToTuple<keyof T>['length']
export type IsMultipleKeys<T> = IsMultiple<CountKeys<T>>
export type IsMultiple<T> = T extends 0 ? false : T extends 1 ? false : true

export type ExcludeNull<T> = Exclude<T, null>

export const mapValues = <
  $Obj extends Record<string, any>,
  $Fn extends (value: $Obj[keyof $Obj], key: keyof $Obj) => any,
>(
  object: $Obj,
  fn: $Fn,
): Record<keyof $Obj, ReturnType<$Fn>> => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      return [key, fn(value, key)]
    }),
  ) as Record<keyof $Obj, ReturnType<$Fn>>
}

export type SetProperty<$Obj extends object, $Prop extends keyof $Obj, $Type extends $Obj[$Prop]> =
  & Omit<$Obj, $Prop>
  & { [_ in $Prop]: $Type }

export const lowerCaseFirstLetter = (s: string) => {
  return s.charAt(0).toLowerCase() + s.slice(1)
}

export function assertArray(v: unknown): asserts v is unknown[] {
  if (!Array.isArray(v)) throw new Error(`Expected array. Got: ${String(v)}`)
}

export function assertObject(v: unknown): asserts v is object {
  if (v === null || typeof v !== `object`) throw new Error(`Expected object. Got: ${String(v)}`)
}

export type StringKeyof<T> = keyof T & string

export type MaybePromise<T> = T | Promise<T>

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)
