import type { Config } from '../config.js'
import type { GeneratedModule } from './moduleGenerator.js'

type FactoryModuleGeneratorRunner = <$CustomInput extends object = {}>(
  runnerImplementation: ModuleGeneratorRunnerImplementation<$CustomInput>,
) => CodeGenerator<$CustomInput>

export type ModuleGeneratorRunner = (config: Config) => GeneratedModule

export type CodeGenerator<$CustomInput extends object = {}> = (input: $CustomInput & BaseInput) => Code

export type ModuleGeneratorRunnerImplementation<$CustomInput extends object = {}> = (
  input: $CustomInput & BaseInputInternal,
) => void

interface BaseInputInternal extends BaseInput {
  code: LinesOfGeneratedCode
}

interface BaseInput {
  config: Config
}

type LinesOfGeneratedCode = (Code | null)[]

type Code = string

export const createModuleGeneratorRunner: FactoryModuleGeneratorRunner = (runnerImplementation) => {
  return (input) => {
    const code: LinesOfGeneratedCode = []
    runnerImplementation({ ...input, code })
    return code.filter(_ => _ !== null).map(_ => _.trim()).join(`\n`)
  }
}
