import { createModuleGenerator } from '../helpers/moduleGenerator.js'

export type Path = string[]

export interface SchemaCustomScalarIndex {
  byType: Record<string, { path: Path }[]>
  isEmpty: boolean
  output: {
    isEmpty: boolean
    byRoot: {
      Query: { path: Path }[]
      Mutation: { path: Path }[]
      Subscription: { path: Path }[]
    }
  }
}

export const ModuleGeneratorSchemaCustomScalarIndex = createModuleGenerator(
  `SchemaCustomScalarIndex`,
  ({ code }) => {
    code.push(``)
    return code
  },
)
