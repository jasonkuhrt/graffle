// @vitest-environment node

// WARNING:
// This test is generated by scripts/generate-example-derivatives/generate.ts
// Do not modify this file directly.

import { expect, test } from 'vitest'
import { runExample } from '../../../scripts/generate-examples-derivatives/helpers.js'

test(`generated_alias__alias`, async () => {
  const exampleResult = await runExample(`./examples/55_generated/generated_alias__alias.ts`)
  // Examples should output their data results.
  const exampleResultMaybeEncoded = exampleResult
  // If ever outputs vary by Node version, you can use this to snapshot by Node version.
  // const nodeMajor = process.version.match(/v(\d+)/)?.[1] ?? `unknown`
  await expect(exampleResultMaybeEncoded).toMatchFileSnapshot(
    `../../../examples/__outputs__/55_generated/generated_alias__alias.output.txt`,
  )
})
