import type { Mock } from 'vitest'
import { describe, expect, test, vi } from 'vitest'
import type { Core, ExtensionInput } from './main.js'
import { runExtensions } from './main.js'

type Input = { value: string }
type $Core = Core<'a' | 'b', { a: Mock; b: Mock }>

const createCore = (): $Core => {
  const a = vi.fn().mockImplementation((input: Input) => {
    return { value: input.value + `+a` }
  })
  const b = vi.fn().mockImplementation((input: Input) => {
    return { value: input.value + `+b` }
  })

  return {
    hookNamesOrderedBySequence: [`a`, `b`],
    implementationsByHook: { a, b },
  }
}

let core: $Core

const run = async (...extensions: ExtensionInput[]) => {
  core = createCore()

  const result = await runExtensions({
    core,
    initialInput,
    extensions,
  })
  return result
}

// const extensions = [async function ex1({ a }) {
//   const { b } = await a(a.input)
//   const result = await b(b.input)
//   return result
// }, async function ex2({ a }) {
//   const { b } = await a(a.input)
//   const result = await b(b.input)
//   return result
// }]

const initialInput = { value: `initial` }

describe(`no extensions`, () => {
  test(`passthrough to implementation`, async () => {
    const result = await run()
    expect(result).toEqual({ value: `initial+a+b` })
  })
})

describe(`one extension`, () => {
  test(`can return own result`, async () => {
    expect(
      await run(async ({ a }) => {
        const { b } = await a(a.input)
        await b(b.input)
        return 0
      }),
    ).toEqual(0)
  })
  test(`can short-circuit at start, return input`, async () => {
    expect(await run(({ a }) => a.input)).toEqual(initialInput)
  })
  test(`can short-circuit at start, return own result`, async () => {
    expect(await run(() => 0)).toEqual(0)
  })
  test(`can short-circuit after first hook, return own result`, async () => {
    expect(
      await run(async ({ a }) => {
        const { b } = await a(a.input)
        return b.input.value + `+x`
      }),
    ).toEqual(`initial+a+x`)
    expect(core.implementationsByHook.a).toHaveBeenCalled()
    expect(core.implementationsByHook.b).not.toHaveBeenCalled()
  })
})
