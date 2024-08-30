// @vitest-environment node

// WARNING:
// This test is generated by scripts/generate-test-examples.ts
// Do not modify this file directly.

import { execaCommand } from 'execa'
import stripAnsi from 'strip-ansi'
import { expect, test } from 'vitest'

test(`arguments`, async () => {
  const result = await execaCommand(`pnpm tsx ./examples/arguments.ts`)
  expect(result.exitCode).toBe(0)
  // Examples should output their data results.
  const exampleResult = stripAnsi(result.stdout)
  const nodeMajor = process.version.match(/v(\d+)/)[1]
  await expect(exampleResult).toMatchFileSnapshot(`../.././examples/arguments.output.node-${nodeMajor}.txt`)
})
