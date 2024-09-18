import { createCodeGenerator } from '../createCodeGenerator.js'

export const { generate: generateData, moduleName: moduleNameData } = createCodeGenerator(
  `Data`,
  (config) => {
    const code: string[] = []

    code.push(
      `export const Name = \`${config.name}\``,
      `export type Name = '${config.name}'`,
    )

    return code.join(`\n\n`)
  },
)
