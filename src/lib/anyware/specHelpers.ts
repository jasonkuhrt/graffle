import type { Mock } from 'vitest'
import { beforeEach, vi } from 'vitest'
import { Anyware } from './__.js'
import { type ExtensionInput, type Options } from './main.js'

export type Input = { value: string }
export const initialInput: Input = { value: `initial` }

// export type $Core = Core<['a', 'b'],Anyware.HookMap<['a','b']>,Input>

type $Core = ReturnType<typeof createAnyware> & {
  hooks: {
    a: Mock
    b: Mock
  }
}

export const createAnyware = () => {
  const a = vi.fn().mockImplementation((input: Input) => {
    return { value: input.value + `+a` }
  })
  const b = vi.fn().mockImplementation((input: Input) => {
    return { value: input.value + `+b` }
  })

  return Anyware.create<['a', 'b'], Anyware.HookMap<['a', 'b']>, Input>({
    hookNamesOrderedBySequence: [`a`, `b`],
    hooks: { a, b },
  })
}

// @ts-expect-error
export let anyware: Anyware.Builder<$Core> = null
export let core: $Core

beforeEach(() => {
  // @ts-expect-error mock types not tracked by Anyware
  anyware = createAnyware()
  core = anyware.core
})

export const runWithOptions = (options: Options = {}) => async (...extensions: ExtensionInput[]) => {
  const result = await anyware.run({
    initialInput,
    // @ts-expect-error fixme
    extensions,
    options,
  })
  return result
}

export const run = async (...extensions: ExtensionInput[]) => runWithOptions({})(...extensions)

export const oops = new Error(`oops`)
