import {
  createCodeGenerator,
  type ModuleGeneratorRunner,
  type ModuleGeneratorRunnerImplementation,
} from './moduleGeneratorRunner.js'

export type FactoryModuleGenerator = <$Name extends string>(
  /**
   * The name of the file that will be written to disk.
   */
  name: $Name,
  runnerImplementation: ModuleGeneratorRunnerImplementation,
) => ModuleGenerator<$Name>

export interface ModuleGenerator<$Name extends string = string> {
  /**
   * The name of the file that will be written to disk.
   */
  name: $Name
  generate: ModuleGeneratorRunner
}

export interface GeneratedModule<$Name extends string = string> {
  name: $Name
  content: string
}

export const createModuleGenerator: FactoryModuleGenerator = (name, runnerImplementation) => {
  const runner = createCodeGenerator(runnerImplementation)

  const generate: ModuleGeneratorRunner = (config) => {
    const content = runner({ config })
    return {
      content,
      name,
    }
  }

  return {
    name,
    generate,
  }
}
