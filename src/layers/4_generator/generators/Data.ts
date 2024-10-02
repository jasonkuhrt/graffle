import { createModuleGenerator } from '../helpers/moduleGenerator.js'

export const ModuleGeneratorData = createModuleGenerator(
  `Data`,
  ({ config, code }) => {
    code(
      `export const Name = \`${config.name}\``,
      `export type Name = '${config.name}'`,
    )

    return code
  },
)
