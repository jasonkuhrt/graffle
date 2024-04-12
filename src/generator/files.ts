import { createFromBuffer } from '@dprint/formatter'
import { getPath } from '@dprint/typescript'
import _ from 'json-bigint'
import fs from 'node:fs/promises'
import * as Path from 'node:path'
import { errorFromMaybeError } from '../lib/prelude.js'
import { generateCode, type Input as GenerateInput } from './code/code.js'

export interface Input {
  outputDirPath: string
  code?: Omit<GenerateInput, 'schemaSource' | 'sourceDirPath'>
  sourceDirPath?: string
  schemaPath?: string
  format?: boolean
}

export const generateFiles = async (input: Input) => {
  const sourceDirPath = input.sourceDirPath ?? process.cwd()
  const schemaPath = input.schemaPath ?? Path.join(sourceDirPath, `schema.graphql`)
  const schemaSource = await fs.readFile(schemaPath, `utf8`)

  const customScalarCodecsPath = Path.relative(input.outputDirPath, Path.join(sourceDirPath, `customScalarCodecs.js`))
  // todo support other extensions: .tsx,.js,.mjs,.cjs
  const customScalarCodecsPathExists = await fileExists(customScalarCodecsPath.replace(`.js`, `.ts`))
  const formatter = input.format ? createFromBuffer(await fs.readFile(getPath())) : undefined

  const options: GenerateInput['options'] = {
    formatter,
    customScalars: customScalarCodecsPathExists,
  }

  const code = generateCode({
    schemaSource,
    importPaths: {
      customScalarCodecs: customScalarCodecsPath,
    },
    ...input.code,
    options,
  })
  await fs.mkdir(input.outputDirPath, { recursive: true })
  await fs.writeFile(`${input.outputDirPath}/Index.ts`, code.index, { encoding: `utf8` })
  await fs.writeFile(`${input.outputDirPath}/SchemaBuildtime.ts`, code.schemaBuildtime, { encoding: `utf8` })
  await fs.writeFile(`${input.outputDirPath}/Scalar.ts`, code.scalars, { encoding: `utf8` })
  await fs.writeFile(`${input.outputDirPath}/SchemaRuntime.ts`, code.schemaRuntime, { encoding: `utf8` })
}

const fileExists = async (path: string) => {
  return Boolean(
    await fs.stat(path).catch((_: unknown) => {
      const error = errorFromMaybeError(_)
      return `code` in error && typeof error.code === `string` && error.code === `ENOENT`
        ? null
        : Promise.reject(error)
    }),
  )
}
