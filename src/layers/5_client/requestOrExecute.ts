import type { ExecutionResult, GraphQLSchema } from 'graphql'
import { execute } from '../0_functions/execute.js'
import type { URLInput } from '../0_functions/request.js'
import type { BaseInput } from '../0_functions/types.js'
import type { ErrorGraffleExtensionEntryHook } from './extension/getEntrypoint.js'
import { getEntrypoint } from './extension/getEntrypoint.js'
import { runHook } from './extension/runStack.js'
import { type Extension, getHookName, type HookName, hooksOrderedBySequence, isHook } from './extension/types.js'

export type SchemaInput = URLInput | GraphQLSchema

export interface Input extends BaseInput {
  schema: SchemaInput
  extensions: Extension[]
}

type ExtensionsByEntrypoint = Record<HookName, Extension[]>

type AttachmentRegistry = Record<HookName, any /* todo */>

export const requestOrExecute = async (
  input: Input,
): Promise<ErrorGraffleExtensionEntryHook | ExecutionResult> => {
  const { schema, extensions: _, ...baseInput } = input

  if (schema instanceof URL || typeof schema === `string`) {
    const extensionsByEntrypoint: ExtensionsByEntrypoint = {
      request: [],
      fetch: [],
    }

    for (const c of input.extensions) {
      const entrypoint = getEntrypoint(c)
      if (entrypoint instanceof Error) {
        return entrypoint
      }
      extensionsByEntrypoint[entrypoint].push(c)
    }

    const initialInputHookRequest = { url: schema, ...baseInput }
    const result = runHook(extensionsByEntrypoint.request, initialInputHookRequest)
    return result
  }

  return await execute({ schema, ...baseInput })
}

/**
 * TODO
 * Allow extensions to short circuit.
 * But starting simple at first.
 */

extension(input)

const runExtensions = async (extensionsByEntrypoint: ExtensionsByEntrypoint) => {
  const attachmentsRegistry: AttachmentRegistry = {
    request: [],
    fetch: [],
    // todo? Special hook that gets final result and must return that (type of)
    // The bottom of the stack would always be a passthrough function
    // end: [],
  }
  for (const hook of hooksOrderedBySequence) {
    const extensions = extensionsByEntrypoint[hook]
    for (const extension of extensions) {
      /**
       * An extension output could be:
       *
       * 1. Input for downstream hook
       * 2. Input for end
       */
      //
      const output = await extension(input /* todo */)
      if (isHook(output)) {
        const hookName = getHookName(output)
        attachmentsRegistry[hookName].push(output)
      }
    }
  }
}

const runAttachmentsRegistry = async (attachmentRegistry: AttachmentRegistry) => {
  for (const hook of hooksOrderedBySequence) {
    const attachments = attachmentRegistry[hook]
    await runAttachments(attachments)
  }
}
const runAttachments = async (attachments) => {
  for (const attachment of attachments) {
    const result = await attachment()
  }
}
