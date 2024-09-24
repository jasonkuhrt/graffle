import { createModuleGenerator } from '../createCodeGenerator.js'

export const { generate: generateData, moduleName: moduleNameData } = createModuleGenerator(
  `Data`,
  ({ config, code }) => {
    code.push(
      `export const Name = \`${config.name}\``,
      `export type Name = '${config.name}'`,
    )

    return code
  },
)
