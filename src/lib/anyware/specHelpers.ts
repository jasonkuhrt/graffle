import { vi } from 'vitest'
import { type Core, type ExtensionInput, type Options, runWithExtensions } from './main.js'

export type Input = { value: string }

export type $Core = Core

export let core: $Core = null

export const createCore = (): $Core => {
  const a = vi.fn().mockImplementation((input: Input) => {
    return { value: input.value + `+a` }
  })
  const b = vi.fn().mockImplementation((input: Input) => {
    return { value: input.value + `+b` }
  })

  return {
    hookNamesOrderedBySequence: [`a`, `b`],
    hooks: { a, b },
  }
}

export const runWithOptions = (options: Options = {}) => async (...extensions: ExtensionInput[]) => {
  core = createCore()
  const result = await runWithExtensions({
    core,
    initialInput: { value: `initial` },
    extensions,
    options,
  })
  return result
}

export const run = async (...extensions: ExtensionInput[]) => runWithOptions({})(...extensions)
