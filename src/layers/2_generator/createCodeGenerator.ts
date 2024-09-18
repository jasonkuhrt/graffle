import type { Config } from './generateCode.js'

interface ModuleGeneratorResult {
  moduleName: string
  code: string
}

export type ModuleGenerator = (config: Config) => ModuleGeneratorResult

export type ModuleGeneratorConstructor = (
  moduleName: string,
  codeGenerator: CodeGeneratorImplementation,
) => { moduleName: string; generate: ModuleGenerator }

export const createModuleGenerator: ModuleGeneratorConstructor = (moduleName, codeGeneratorImplementation) => {
  const codeGenerator = createCodeGenerator(codeGeneratorImplementation)

  const generate: ModuleGenerator = (config) => {
    const code = codeGenerator({ config })
    return {
      code,
      moduleName,
    }
  }
  return { moduleName, generate }
}

export const createCodeGenerator = <$CustomInput extends object = {}>(
  codeGeneratorImplementation: CodeGeneratorImplementation<$CustomInput>,
): CodeGenerator<$CustomInput> => {
  return (input) => {
    return codeGeneratorImplementation({ ...input, code: [] }).filter(_ => _ !== null).join(`\n`)
  }
}

export type CodeGenerator<$CustomInput extends object = {}> = (input: $CustomInput & BaseInput) => Code

interface BaseInput {
  config: Config
}
interface BaseInputInternal extends BaseInput {
  code: LinesOfGeneratedCode
}

export type CodeGeneratorImplementation<$CustomInput extends object = {}> = (
  input: $CustomInput & BaseInputInternal,
) => LinesOfGeneratedCode

type Code = string

type LinesOfGeneratedCode = (Code | null)[]
