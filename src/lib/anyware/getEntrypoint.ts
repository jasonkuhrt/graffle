// import type { Extension, HookName } from '../../layers/5_client/extension/types.js'
import { analyzeFunction } from '../analyzeFunction.js'
import { ContextualError } from '../errors/ContextualError.js'
import type { HookName, NonRetryingExtensionInput } from './main.js'

export class ErrorAnywareExtensionEntrypoint extends ContextualError<
  'ErrorGraffleExtensionEntryHook',
  { issue: ExtensionEntryHookIssue }
> {
  // todo add to context: parameters value parsed and raw
  constructor(context: { issue: ExtensionEntryHookIssue }) {
    super(`Extension must destructure the first parameter passed to it and select exactly one entrypoint.`, context)
  }
}

export const ExtensionEntryHookIssue = {
  multipleParameters: `multipleParameters`,
  noParameters: `noParameters`,
  notDestructured: `notDestructured`,
  destructuredWithoutEntryHook: `destructuredWithoutEntryHook`,
  multipleDestructuredHookNames: `multipleDestructuredHookNames`,
} as const

export type ExtensionEntryHookIssue = typeof ExtensionEntryHookIssue[keyof typeof ExtensionEntryHookIssue]

export const getEntrypoint = (
  hookNames: readonly string[],
  extension: NonRetryingExtensionInput,
): ErrorAnywareExtensionEntrypoint | HookName => {
  const x = analyzeFunction(extension)
  if (x.parameters.length > 1) {
    return new ErrorAnywareExtensionEntrypoint({ issue: ExtensionEntryHookIssue.multipleParameters })
  }
  const p = x.parameters[0]
  if (!p) {
    return new ErrorAnywareExtensionEntrypoint({ issue: ExtensionEntryHookIssue.noParameters })
  } else {
    if (p.type === `name`) {
      return new ErrorAnywareExtensionEntrypoint({ issue: ExtensionEntryHookIssue.notDestructured })
    } else {
      if (p.names.length === 0) {
        return new ErrorAnywareExtensionEntrypoint({ issue: ExtensionEntryHookIssue.destructuredWithoutEntryHook })
      }
      const hooks = p.names.filter(_ => hookNames.includes(_ as any))

      if (hooks.length > 1) {
        return new ErrorAnywareExtensionEntrypoint({ issue: ExtensionEntryHookIssue.multipleDestructuredHookNames })
      }
      const hook = hooks[0]
      if (!hook) {
        return new ErrorAnywareExtensionEntrypoint({ issue: ExtensionEntryHookIssue.destructuredWithoutEntryHook })
      } else {
        return hook
      }
    }
  }
}
