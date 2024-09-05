import { readFiles } from '../lib/readFiles.js'

export const examplesIgnorePatterns = [`./examples/$*`, `./examples/*.output.*`, `./examples/*.output-encoder.*`]

export const readExampleFiles = () =>
  readFiles({
    pattern: `./examples/*.ts`,
    options: { ignore: examplesIgnorePatterns },
  })
