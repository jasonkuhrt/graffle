import { createCodeGenerator } from '../createCodeGenerator.js'

export const { generate: generateError, moduleName: moduleNameError } = createCodeGenerator(
  `Error`,
  (config) => {
    const code: string[] = []

    code.push(
      `type Include<T, U> = Exclude<T, Exclude<T, U>>`,
      `type ObjectWithTypeName = { __typename: string }`,
    )

    code.push(`
    const ErrorObjectsTypeNameSelectedEnum = {
      ${config.error.objects.map(_ => `${_.name}: { __typename: '${_.name}' }`).join(`,\n`)}
    } as ${config.error.objects.length > 0 ? `const` : `Record<string,ObjectWithTypeName>`}

    const ErrorObjectsTypeNameSelected = Object.values(ErrorObjectsTypeNameSelectedEnum)

    type ErrorObjectsTypeNameSelected = (typeof ErrorObjectsTypeNameSelected)[number]
  `)

    code.push(
      `export const isError = <$Value>(value:$Value): value is Include<$Value, ErrorObjectsTypeNameSelected> =>  {
      return typeof value === 'object' && value !== null && '__typename' in value &&
      ErrorObjectsTypeNameSelected.some(_ => _.__typename === value.__typename)
    }`,
    )

    return code.join(`\n\n`)
  },
)
