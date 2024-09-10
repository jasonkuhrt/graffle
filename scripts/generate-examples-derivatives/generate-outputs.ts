import * as FS from 'node:fs/promises'
import { deleteFiles } from '../lib/deleteFiles.js'
import { directories, type Example, runExample } from './helpers.js'

export const generateOutputs = async (examples: Example[]) => {
  // Handle case of renaming or deleting examples.
  await Promise.all([
    deleteFiles({ pattern: `./examples/*.output.txt` }),
    deleteFiles({ pattern: `${directories.outputs}/*.output.txt` }),
  ])

  await Promise.all(examples.map(async (example) => {
    const filePath = `./examples/${example.file.name}.ts`
    const exampleResult = await runExample(filePath)
    await FS.writeFile(`${directories.outputs}/${example.file.name}.output.txt`, exampleResult)
  }))

  console.log(`Generated an output for each example.`)
}
