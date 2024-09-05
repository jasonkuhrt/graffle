import { execaCommand } from 'execa'
import * as FS from 'node:fs/promises'
import stripAnsi from 'strip-ansi'
import { deleteFiles } from '../lib/deleteFiles.js'
import { readExampleFiles } from './helpers.js'

export const generateOutputs = async () => {
  // Handle case of renaming or deleting examples.
  await deleteFiles({ pattern: `./examples/*.output.*` })

  const exampleFiles = await readExampleFiles()

  await Promise.all(exampleFiles.map(async (file) => {
    const result = await execaCommand(`pnpm tsx ./examples/${file.name}.ts`)
    const exampleResult = stripAnsi(result.stdout)
    await FS.writeFile(`./examples/${file.name}.output.txt`, exampleResult)
  }))

  console.log(`Generated an output for each example.`)
}
