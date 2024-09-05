// @vitest-environment node

// WARNING:
// This test is generated by scripts/generate-example-derivatives/generate.ts
// Do not modify this file directly.

import { execaCommand } from 'execa'
import stripAnsi from 'strip-ansi'
import { expect, test } from 'vitest'
import { encode } from '../../examples/transport-http_headers__dynamicHeaders.output-encoder.js'

test(`transport-http_headers__dynamicHeaders`, async () => {
  const result = await execaCommand(`pnpm tsx ./examples/transport-http_headers__dynamicHeaders.ts`)
  expect(result.exitCode).toBe(0)
  // Examples should output their data results.
  const exampleResult = encode(stripAnsi(result.stdout))
  // If ever outputs vary by Node version, you can use this to snapshot by Node version.
  // const nodeMajor = process.version.match(/v(\d+)/)?.[1] ?? `unknown`
  await expect(exampleResult).toMatchFileSnapshot(`../.././examples/transport-http_headers__dynamicHeaders.output.txt`)
})
