import * as FS from 'node:fs/promises'
import { deleteFiles } from '../lib/deleteFiles.js'
import { readExampleFiles, runExample } from './helpers.js'

export const generateOutputs = async () => {
  // Handle case of renaming or deleting examples.
  await deleteFiles({ pattern: `./examples/*.output.*` })

  const exampleFiles = await readExampleFiles()

  await Promise.all(exampleFiles.map(async (file) => {
    const filePath = `./examples/${file.name}.ts`
    const exampleResult = await runExample(filePath)
    await FS.writeFile(`./examples/${file.name}.output.txt`, exampleResult)
  }))

  console.log(`Generated an output for each example.`)
}
