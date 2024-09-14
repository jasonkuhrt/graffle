import * as FS from 'node:fs/promises'
import * as Path from 'node:path'
import { deleteFiles } from '../lib/deleteFiles.js'
import { directories, readExampleFiles, runExample } from './helpers.js'

export const outputExtension = `.output.txt`
export const outputEncoderExtension = `.output.encoder.ts`

export const getOutputFilePathFromExampleFilePath = (filePath: string) => {
  const dirPathWithinExamples = Path.dirname(filePath.replace(directories.examples, ``))
  const outputFileName = Path.basename(filePath, Path.extname(filePath)) + outputExtension
  const dir = Path.join(directories.outputs, dirPathWithinExamples)
  const outputFilePath = Path.join(dir, outputFileName)
  return outputFilePath
}

export const getOutputEncoderFilePathFromExampleFilePath = (filePath: string) => {
  const outputFilePath = getOutputFilePathFromExampleFilePath(filePath)
  return outputFilePath.replace(outputExtension, outputEncoderExtension)
}

export const generateOutputs = async () => {
  const exampleFiles = await readExampleFiles()

  // Handle case of renaming or deleting examples.
  await Promise.all([
    deleteFiles({ pattern: `${directories.outputs}/**/*${outputExtension}` }),
  ])

  await Promise.all(exampleFiles.map(async (file) => {
    const content = await runExample(file.path.full)

    const dirPathWithinExamples = Path.dirname(file.path.full.replace(directories.examples, ``))
    const dir = Path.join(directories.outputs, dirPathWithinExamples)
    await FS.mkdir(dir, { recursive: true })

    const filePath = getOutputFilePathFromExampleFilePath(file.path.full)
    await FS.writeFile(filePath, content)
    console.log(`Got and stored output at`, filePath)
  }))

  console.log(`Generated an output for each example.`)
}
