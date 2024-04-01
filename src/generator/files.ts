import { createFromBuffer } from '@dprint/formatter'
import { getPath } from '@dprint/typescript'
import fs from 'node:fs/promises'
import * as Path from 'node:path'
import { generateCode, type Input as GenerateInput } from './code/code.js'

export interface Input {
  outputDirPath: string
  code: Omit<GenerateInput, 'schemaSource' | 'sourceDirPath'>
  sourceDirPath?: string
  schemaPath?: string
  format?: boolean
}

export const generateFiles = async (input: Input) => {
  const sourceDirPath = input.sourceDirPath ?? process.cwd()
  const schemaPath = input.schemaPath ?? Path.join(sourceDirPath, `schema.graphql`)
  const schemaSource = await fs.readFile(schemaPath, `utf8`)
  const options = (input.format ?? true)
    ? {
      formatter: createFromBuffer(await fs.readFile(getPath())),
    }
    : undefined
  const code = generateCode({
    schemaSource,
    importPaths: {
      customScalarCodecs: Path.relative(input.outputDirPath, Path.join(sourceDirPath, `customScalarCodecs.js`)),
    },
    ...input.code,
    options,
  })
  await fs.mkdir(input.outputDirPath, { recursive: true })
  await fs.writeFile(`${input.outputDirPath}/SchemaBuildtime.ts`, code.schemaBuildtime, { encoding: `utf8` })
  await fs.writeFile(`${input.outputDirPath}/Scalar.ts`, code.scalars, { encoding: `utf8` })
  await fs.writeFile(`${input.outputDirPath}/SchemaRuntime.ts`, code.schemaRuntime, { encoding: `utf8` })
}
