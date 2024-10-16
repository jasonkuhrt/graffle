import { globby } from 'globby'
import { readFile } from 'node:fs/promises'
import * as Path from 'node:path'
import { expect, test } from 'vitest'

test(`kitchen-sink generated modules`, async () => {
  const basePath = `./tests/_/schemas/kitchen-sink/graffle`
  const filePaths = await globby(`${basePath}/**/*.ts`)
  for (const filePath of filePaths) {
    const relativeFilePath = Path.relative(basePath, filePath)
    const content = await readFile(filePath, `utf8`)
    expect(content).toMatchSnapshot(relativeFilePath)
  }
})
