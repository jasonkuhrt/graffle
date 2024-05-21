import type { Mock } from 'vitest'
import { beforeEach, vi } from 'vitest'
import { Anyware } from './__.js'
import { type Core, type ExtensionInput, type Options, runWithExtensions } from './main.js'

export type Input = { value: string }

export type $Core = Core<['a', 'b']> & {
  hooks: {
    a: Mock
    b: Mock
  }
}

// @ts-expect-error
export let core: $Core = null

export const createCore = (): $Core => {
  const a = vi.fn().mockImplementation((input: Input) => {
    return { value: input.value + `+a` }
  })
  const b = vi.fn().mockImplementation((input: Input) => {
    return { value: input.value + `+b` }
  })

  return Anyware.createCore({
    hookNamesOrderedBySequence: [`a`, `b`],
    hooks: { a, b },
  }) as $Core
}

beforeEach(() => {
  core = createCore()
})

export const runWithOptions = (options: Options = {}) => async (...extensions: ExtensionInput[]) => {
  const result = await runWithExtensions({
    core,
    initialInput: { value: `initial` },
    extensions,
    options,
  })
  return result
}

export const run = async (...extensions: ExtensionInput[]) => runWithOptions({})(...extensions)

export const oops = new Error(`oops`)
