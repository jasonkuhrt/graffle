import type { ExecutionResult, GraphQLSchema } from 'graphql'
import { execute } from '../0_functions/execute.js'
import type { URLInput } from '../0_functions/request.js'
import type { BaseInput } from '../0_functions/types.js'
import type { ErrorGraffleExtensionEntryHook } from './extension/getEntryHook.js'
import { getEntryHook } from './extension/getEntryHook.js'
import { runStack } from './extension/runStack.js'
import type { Extension, HookName } from './extension/types.js'

export type SchemaInput = URLInput | GraphQLSchema

export interface Input extends BaseInput {
  schema: SchemaInput
  extensions: Extension[]
}

export const requestOrExecute = async (
  input: Input,
): Promise<ErrorGraffleExtensionEntryHook | ExecutionResult> => {
  const { schema, extensions: _, ...baseInput } = input

  if (schema instanceof URL || typeof schema === `string`) {
    const extensionsByEntrypoint: Record<HookName, Extension[]> = {
      send: [],
    }

    for (const c of input.extensions) {
      const hookName = getEntryHook(c)
      if (hookName instanceof Error) {
        return hookName
      }
      extensionsByEntrypoint[hookName].push(c)
    }

    const initialInputHookSend = { url: schema, ...baseInput }
    const result = runStack(extensionsByEntrypoint.send, initialInputHookSend)
    return result
  }

  return await execute({ schema, ...baseInput })
}
