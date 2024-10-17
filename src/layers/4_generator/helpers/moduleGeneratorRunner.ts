import type { Config } from '../config/config.js'
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
  code: CodePusher
}

interface BaseInput {
  config: Config
}

type CodePusher = (...lines: (Code | null)[]) => void

type LinesOfGeneratedCode = (Code | null)[]

type Code = string

export const createCodeGenerator: FactoryModuleGeneratorRunner = (runnerImplementation) => {
  return (input) => {
    const code: LinesOfGeneratedCode = []
    const codePusher: CodePusher = (...lines) => {
      if (lines.length === 0) {
        code.push(``)
      } else {
        code.push(...lines)
      }
    }
    runnerImplementation({ ...input, code: codePusher })
    return code.filter(_ => _ !== null).map(_ => _.trim()).join(`\n`)
  }
}
