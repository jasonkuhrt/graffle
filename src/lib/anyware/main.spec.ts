import type { Mock } from 'vitest'
import { describe, expect, test, vi } from 'vitest'
import type { Core, ExtensionInput, Options } from './main.js'
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

const runWithOptions = async (extensions: ExtensionInput[] = [], options: Options = {}) => {
  core = createCore()

  const result = await runExtensions({
    core,
    initialInput: { value: `initial` },
    extensions,
    options,
  })
  return result
}

const run = async (...extensions: ExtensionInput[]) => runWithOptions(extensions, {})

let core: $Core

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
    expect(core.implementationsByHook.a).toHaveBeenCalled()
    expect(core.implementationsByHook.b).toHaveBeenCalled()
  })
  describe(`can short-circuit`, () => {
    test(`at start, return input`, async () => {
      expect(
        // todo arrow function expression parsing not working
        await run(({ a }) => {
          return a.input
        }),
      ).toEqual({ value: `initial` })
      expect(core.implementationsByHook.a).not.toHaveBeenCalled()
      expect(core.implementationsByHook.b).not.toHaveBeenCalled()
    })
    test(`at start, return own result`, async () => {
      expect(
        // todo arrow function expression parsing not working
        await run(({ a }) => {
          return 0
        }),
      ).toEqual(0)
      expect(core.implementationsByHook.a).not.toHaveBeenCalled()
      expect(core.implementationsByHook.b).not.toHaveBeenCalled()
    })
    test(`after first hook, return own result`, async () => {
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
  describe(`can partially apply`, () => {
    test(`only first hook`, async () => {
      expect(
        await run(async ({ a }) => {
          return await a({ value: a.input.value + `+ext` })
        }),
      ).toEqual({ value: `initial+ext+a+b` })
      expect(core.implementationsByHook.a).toHaveBeenCalled()
      expect(core.implementationsByHook.b).toHaveBeenCalled()
    })
    test(`only second hook`, async () => {
      expect(
        await run(async ({ b }) => {
          return await b({ value: b.input.value + `+ext` })
        }),
      ).toEqual({ value: `initial+a+ext+b` })
      expect(core.implementationsByHook.a).toHaveBeenCalled()
      expect(core.implementationsByHook.b).toHaveBeenCalled()
    })
    test(`only second hook + end`, async () => {
      expect(
        await run(async ({ b }) => {
          const result = await b({ value: b.input.value + `+ext` })
          return result.value + `+end`
        }),
      ).toEqual(`initial+a+ext+b+end`)
      expect(core.implementationsByHook.a).toHaveBeenCalled()
      expect(core.implementationsByHook.b).toHaveBeenCalled()
    })
  })
})

describe(`two extensions`, () => {
  test(`first can short-circuit`, async () => {
    const ex1 = () => 1
    const ex2 = vi.fn().mockImplementation(() => 2)
    expect(await runWithOptions([ex1, ex2], { entrypointSelectionMode: `off` })).toEqual(1)
    expect(ex2).not.toHaveBeenCalled()
    expect(core.implementationsByHook.a).not.toHaveBeenCalled()
    expect(core.implementationsByHook.b).not.toHaveBeenCalled()
  })
})
