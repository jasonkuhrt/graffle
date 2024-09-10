import * as FS from 'node:fs/promises'
import { deleteFiles } from '../lib/deleteFiles.js'
import { directories, readExampleFiles, runExample } from './helpers.js'

export const generateOutputs = async () => {
  const exampleFiles = await readExampleFiles()

  // Handle case of renaming or deleting examples.
  await Promise.all([
    deleteFiles({ pattern: `./examples/*.output.txt` }),
    deleteFiles({ pattern: `${directories.outputs}/*.output.txt` }),
  ])

  await Promise.all(exampleFiles.map(async (file) => {
    const filePath = `./examples/${file.name}.ts`
    const exampleResult = await runExample(filePath)
    await FS.writeFile(`${directories.outputs}/${file.name}.output.txt`, exampleResult)
  }))

  console.log(`Generated an output for each example.`)
}
