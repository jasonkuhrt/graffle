import { createModuleGenerator } from '../helpers/moduleGenerator.js'

export const ModuleGeneratorError = createModuleGenerator(
  `Error`,
  ({ config, code }) => {
    code(
      `type Include<T, U> = Exclude<T, Exclude<T, U>>`,
      `type ObjectWithTypeName = { __typename: string }`,
    )

    code(`
      const ErrorObjectsTypeNameSelectedEnum = {
        ${config.schema.error.objects.map(_ => `${_.name}: { __typename: '${_.name}' }`).join(`,\n`)}
      } as ${config.schema.error.objects.length > 0 ? `const` : `Record<string,ObjectWithTypeName>`}

      const ErrorObjectsTypeNameSelected = Object.values(ErrorObjectsTypeNameSelectedEnum)

      type ErrorObjectsTypeNameSelected = (typeof ErrorObjectsTypeNameSelected)[number]
    `)

    code(
      `export const isError = <$Value>(value:$Value): value is Include<$Value, ErrorObjectsTypeNameSelected> =>  {
      return typeof value === \`object\` && value !== null && \`__typename\` in value &&
      ErrorObjectsTypeNameSelected.some(_ => _.__typename === value.__typename)
    }`,
    )

    return code
  },
)
