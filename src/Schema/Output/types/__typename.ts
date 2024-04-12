export interface __typename<$Type extends string = string> {
  kind: 'typename'
  type: $Type
}

export const __typename = <$Type extends string>(type: $Type): __typename<$Type> => ({ kind: `typename`, type })
