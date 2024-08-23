// @vitest-environment node
import { execaCommand } from 'execa'
import stripAnsi from 'strip-ansi'
import { expect, test } from 'vitest'

test(`arguments`, async () => {
  const result = await execaCommand(`pnpm tsx ./examples/arguments.ts`)
  expect(result.exitCode).toBe(0)
  // Examples should output their data results.
  const exampleResult = stripAnsi(result.stdout)
  await expect(exampleResult).toMatchFileSnapshot(`../.././examples/arguments.output.txt`)
})
