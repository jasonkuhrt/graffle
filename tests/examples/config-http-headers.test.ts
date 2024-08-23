import { execaCommand } from 'execa'
import stripAnsi from 'strip-ansi'
import { expect, test } from 'vitest'

test(`config-http-headers`, async () => {
  const result = await execaCommand(`pnpm tsx ./examples/config-http-headers.ts`)
  expect(result.exitCode).toBe(0)
  // Examples should output their data results.
  const exampleResult = stripAnsi(result.stdout)
  await expect(exampleResult).toMatchFileSnapshot(`../.././examples/config-http-headers.output.txt`)
})
