type Include<T, U> = Exclude<T, Exclude<T, U>>

type ObjectWithTypeName = { __typename: string }

const ErrorObjectsTypeNameSelectedEnum = {
  ErrorOne: { __typename: 'ErrorOne' },
  ErrorTwo: { __typename: 'ErrorTwo' },
} as const

const ErrorObjectsTypeNameSelected = Object.values(ErrorObjectsTypeNameSelectedEnum)

type ErrorObjectsTypeNameSelected = (typeof ErrorObjectsTypeNameSelected)[number]

export const isError = <$Value>(value: $Value): value is Include<$Value, ErrorObjectsTypeNameSelected> => {
  return typeof value === 'object' && value !== null && '__typename' in value
    && ErrorObjectsTypeNameSelected.some(_ => _.__typename === value.__typename)
}
