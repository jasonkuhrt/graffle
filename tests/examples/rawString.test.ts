import { execaCommand } from 'execa'
import stripAnsi from 'strip-ansi'
import { expect, test } from 'vitest'

test(`rawString`, async () => {
  const result = await execaCommand(`pnpm tsx ./examples/rawString.ts`)
  expect(result.exitCode).toBe(0)
  // Examples should output their data results.
  const exampleResult = stripAnsi(result.stdout)
  await expect(exampleResult).toMatchFileSnapshot(`../.././examples/rawString.output.txt`)
})
