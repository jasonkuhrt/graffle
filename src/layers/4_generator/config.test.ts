import { expect, test } from 'vitest'
import { createConfig } from './config.js'

test(`can load schema from custom path`, async () => {
  const customPath = `./tests/_/fixtures/custom.graphql`
  const config = await createConfig({ sourceSchema: { type: `sdl`, dirOrFilePath: customPath } })
  expect(config.paths.project.inputs.schema).toEqual(customPath)
})
