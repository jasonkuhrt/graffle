import type { Mock } from 'vitest'
import { beforeEach, vi } from 'vitest'
import { Anyware } from './__.js'
import { type ExtensionInput, type Options } from './main.js'

export type Input = {
  input: { value: string }
  slots: { append: (hookName: string) => string; appendExtra: (hookName: string) => string }
}

export const initialInput: Input['input'] = { value: `initial` }

// export type $Core = Core<['a', 'b'],Anyware.HookMap<['a','b']>,Input>

type $Core = ReturnType<typeof createAnyware> & {
  hooks: {
    a: {
      run: Mock
      slots: {
        append: Mock<[hookName: string], string>
        appendExtra: Mock<[hookName: string], string>
      }
    }
    b: {
      run: Mock
      slots: {
        append: Mock<[hookName: string], string>
        appendExtra: Mock<[hookName: string], string>
      }
    }
  }
}

export const createAnyware = () => {
  const a = {
    slots: {
      append: vi.fn().mockImplementation((hookName: string) => {
        return hookName
      }),
      appendExtra: vi.fn().mockImplementation(() => {
        return ``
      }),
    },
    run: vi.fn().mockImplementation(({ input, slots }: Input) => {
      const extra = slots.appendExtra(`a`)
      return { value: input.value + `+` + slots.append(`a`) + extra }
    }),
  }
  const b = {
    slots: {
      append: vi.fn().mockImplementation((hookName: string) => {
        return hookName
      }),
      appendExtra: vi.fn().mockImplementation(() => {
        return ``
      }),
    },
    run: vi.fn().mockImplementation(({ input, slots }: Input) => {
      const extra = slots.appendExtra(`b`)
      return { value: input.value + `+` + slots.append(`b`) + extra }
    }),
  }

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
