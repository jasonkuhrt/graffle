// @vitest-environment node

// WARNING:
// This test is generated by scripts/generate-test-examples.ts
// Do not modify this file directly.

import { execaCommand } from 'execa'
import stripAnsi from 'strip-ansi'
import { expect, test } from 'vitest'

test(`transport-http_headers`, async () => {
  const result = await execaCommand(`pnpm tsx ./examples/transport-http_headers.ts`)
  expect(result.exitCode).toBe(0)
  // Examples should output their data results.
  const exampleResult = stripAnsi(result.stdout)
  // If ever outputs vary by Node version, you can use this to snapshot by Node version.
  // const nodeMajor = process.version.match(/v(\d+)/)?.[1] ?? `unknown`
  await expect(exampleResult).toMatchFileSnapshot(`../.././examples/transport-http_headers.output.txt`)
})
