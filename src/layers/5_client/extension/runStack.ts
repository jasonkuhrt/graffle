import { request } from '../../0_functions/request.js'
import type { Extension, HookName } from './types.js'

export const runHook = async (extensions: Extension[], input) => {
  const [extension, ...rest] = extensions

  if (!extension) {
    return request(input)
  }

  const requestHook = async (input) => {
    return await runHook(rest, input)
  }
  requestHook.input = input

  const extensionInput = {
    // entry hooks
    request: requestHook,
  } satisfies Record<HookName, any>

  return await extension(extensionInput)
}
