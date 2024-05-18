import { request } from '../../0_functions/request.js'
import type { Extension } from './types.js'

export const runStack = async (extensions: Extension[], input) => {
  const [extension, ...rest] = extensions
  if (!extension) {
    return request(input)
  }
  const sendHook = async (input) => {
    return await runStack(rest, input)
  }
  sendHook.input = input
  const extensionInput = {
    send: sendHook,
  }
  return await extension(extensionInput)
}
