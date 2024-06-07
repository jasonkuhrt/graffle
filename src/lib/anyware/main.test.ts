/* eslint-disable */

import console from 'node:console'
import { describe, expect, test, vi } from 'vitest'
import type { ContextualError } from '../errors/ContextualError.js'
import { core, initialInput, oops, run, runWithOptions } from './specHelpers.js'

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
    expect(core.hooks.a).toHaveBeenCalled()
    expect(core.hooks.b).toHaveBeenCalled()
  })
  test('can call hook with no input, making the original input be used', () => {
    expect(
      run(async ({ a }) => {
        return await a()
      }),
    ).resolves.toEqual({ value: 'initial+a+b' })
    // todo why doesn't this work?
    // expect(core.hooks.a).toHaveBeenCalled()
    // expect(core.hooks.b).toHaveBeenCalled()
  })
  describe(`can short-circuit`, () => {
    test(`at start, return input`, async () => {
      expect(
        // todo arrow function expression parsing not working
        await run(({ a }) => {
          return a.input
        }),
      ).toEqual({ value: `initial` })
      expect(core.hooks.a).not.toHaveBeenCalled()
      expect(core.hooks.b).not.toHaveBeenCalled()
    })
    test(`at start, return own result`, async () => {
      expect(
        // todo arrow function expression parsing not working
        await run(({ a }) => {
          return 0
        }),
      ).toEqual(0)
      expect(core.hooks.a).not.toHaveBeenCalled()
      expect(core.hooks.b).not.toHaveBeenCalled()
    })
    test(`after first hook, return own result`, async () => {
      expect(
        await run(async ({ a }) => {
          const { b } = await a(a.input)
          return b.input.value + `+x`
        }),
      ).toEqual(`initial+a+x`)
      expect(core.hooks.b).not.toHaveBeenCalled()
    })
  })
  describe(`can partially apply`, () => {
    test(`only first hook`, async () => {
      expect(
        await run(async ({ a }) => {
          return await a({ value: a.input.value + `+ext` })
        }),
      ).toEqual({ value: `initial+ext+a+b` })
    })
    test(`only second hook`, async () => {
      expect(
        await run(async ({ b }) => {
          return await b({ value: b.input.value + `+ext` })
        }),
      ).toEqual({ value: `initial+a+ext+b` })
    })
    test(`only second hook + end`, async () => {
      expect(
        await run(async ({ b }) => {
          const result = await b({ value: b.input.value + `+ext` })
          return result.value + `+end`
        }),
      ).toEqual(`initial+a+ext+b+end`)
    })
  })
})

describe(`two extensions`, () => {
  const run = runWithOptions({ entrypointSelectionMode: `optional` })
  test(`first can short-circuit`, async () => {
    const ex1 = () => 1
    const ex2 = vi.fn().mockImplementation(() => 2)
    expect(await run(ex1, ex2)).toEqual(1)
    expect(ex2).not.toHaveBeenCalled()
    expect(core.hooks.a).not.toHaveBeenCalled()
    expect(core.hooks.b).not.toHaveBeenCalled()
  })

  test(`each can adjust first hook then passthrough`, async () => {
    const ex1 = ({ a }: any) => a({ value: a.input.value + `+ex1` })
    const ex2 = ({ a }: any) => a({ value: a.input.value + `+ex2` })
    expect(await run(ex1, ex2)).toEqual({ value: `initial+ex1+ex2+a+b` })
  })

  test(`each can adjust each hook`, async () => {
    const ex1 = async ({ a }: any) => {
      const { b } = await a({ value: a.input.value + `+ex1` })
      return await b({ value: b.input.value + `+ex1` })
    }
    const ex2 = async ({ a }: any) => {
      const { b } = await a({ value: a.input.value + `+ex2` })
      return await b({ value: b.input.value + `+ex2` })
    }
    expect(await run(ex1, ex2)).toEqual({ value: `initial+ex1+ex2+a+ex1+ex2+b` })
  })

  test(`second can skip hook a`, async () => {
    const ex1 = async ({ a }: any) => {
      const { b } = await a({ value: a.input.value + `+ex1` })
      return await b({ value: b.input.value + `+ex1` })
    }
    const ex2 = async ({ b }: any) => {
      return await b({ value: b.input.value + `+ex2` })
    }
    expect(await run(ex1, ex2)).toEqual({ value: `initial+ex1+a+ex1+ex2+b` })
  })
  test(`second can short-circuit before hook a`, async () => {
    let ex1AfterA = false
    const ex1 = async ({ a }: any) => {
      const { b } = await a({ value: a.input.value + `+ex1` })
      ex1AfterA = true
    }
    const ex2 = async ({ a }: any) => {
      return 2
    }
    expect(await run(ex1, ex2)).toEqual(2)
    expect(ex1AfterA).toBe(false)
    expect(core.hooks.a).not.toHaveBeenCalled()
    expect(core.hooks.b).not.toHaveBeenCalled()
  })
  test(`second can short-circuit after hook a`, async () => {
    let ex1AfterB = false
    const ex1 = async ({ a }: any) => {
      const { b } = await a({ value: a.input.value + `+ex1` })
      await b({ value: b.input.value + `+ex1` })
      ex1AfterB = true
    }
    const ex2 = async ({ a }: any) => {
      await a({ value: a.input.value + `+ex2` })
      return 2
    }
    expect(await run(ex1, ex2)).toEqual(2)
    expect(ex1AfterB).toBe(false)
    expect(core.hooks.a).toHaveBeenCalledOnce()
    expect(core.hooks.b).not.toHaveBeenCalled()
  })
})

describe(`errors`, () => {
  test(`extension that throws a non-error is wrapped in error`, async () => {
    const result = await run(async ({ a }) => {
      throw `oops`
    }) as ContextualError
    expect({
      result,
      context: result.context,
      cause: result.cause,
    }).toMatchInlineSnapshot(`
      {
        "cause": [Error: oops],
        "context": {
          "extensionName": "anonymous",
          "hookName": "a",
          "source": "extension",
        },
        "result": [ContextualError: There was an error in the extension "anonymous" (use named functions to improve this error message) while running hook "a".],
      }
    `)
  })
  test(`extension throws asynchronously`, async () => {
    const result = await run(async ({ a }) => {
      throw oops
    }) as ContextualError
    expect({
      result,
      context: result.context,
      cause: result.cause,
    }).toMatchInlineSnapshot(`
      {
        "cause": [Error: oops],
        "context": {
          "extensionName": "anonymous",
          "hookName": "a",
          "source": "extension",
        },
        "result": [ContextualError: There was an error in the extension "anonymous" (use named functions to improve this error message) while running hook "a".],
      }
    `)
  })

  test(`if implementation fails, without extensions, result is the error`, async () => {
    core.hooks.a.mockReset().mockRejectedValueOnce(oops)
    const result = await run() as ContextualError
    expect({
      result,
      context: result.context,
      cause: result.cause,
    }).toMatchInlineSnapshot(`
      {
        "cause": [Error: oops],
        "context": {
          "hookName": "a",
          "source": "implementation",
        },
        "result": [ContextualError: There was an error in the core implementation of hook "a".],
      }
    `)
  })
  test('calling a hook twice leads to clear error', async () => {
    const result = await run(async ({ a }) => {
      a()
      a()
    }) as ContextualError
    const cause = result.cause as ContextualError
    expect(cause.message).toMatchInlineSnapshot(
      `"You already invoked hook "a". Hooks can only be invoked multiple times if the previous attempt failed."`,
    )
    expect(cause.context).toEqual({ hookName: 'a' })
  })
  test.only('if hook fails, extension can retry, then short-circuit', async () => {
    core.hooks.a.mockReset().mockRejectedValueOnce(oops).mockResolvedValueOnce(1)
    const result = await run(async ({ a }) => {
      const result1 = await a()
      expect(result1).toEqual(oops)
      const result2 = await a()
      expect(typeof result2.b).toEqual('function')
      expect(result2.b.input).toEqual(1)
      return result2.b.input
    })
    expect(result).toEqual(1)
  })
  test.skip('if hook fails, extension can retry it, then continue to next hook.', async () => {
    core.hooks.a.mockReset().mockRejectedValueOnce(oops).mockResolvedValueOnce(1)
    const result = await run(
      async function foo({ a }) {
        const resultA1 = await a()
        const resultA2 = await a()
        const resultB1 = await resultA2.b()
        return resultB1
      },
    )
    console.log(result)
    expect(result).toEqual(1)
  })
})
