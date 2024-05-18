import { analyzeFunction } from '../../../lib/analyzeFunction.js'
import { ContextualError } from '../../../lib/errors/ContextualError.js'
import type { Extension, HookName } from './types.js'
import { hookNames } from './types.js'

export class ErrorGraffleExtensionEntryHook extends ContextualError<
  'ErrorGraffleExtensionEntryHook',
  { issue: ExtensionEntryHookIssue }
> {
  // todo add to context: parameters value parsed and raw
  constructor(context: { issue: ExtensionEntryHookIssue }) {
    super(`Extension must destructure the input object and select an entry hook to use.`, context)
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

export const getEntryHook = (extension: Extension): ErrorGraffleExtensionEntryHook | HookName => {
  const x = analyzeFunction(extension)
  if (x.parameters.length > 1) {
    return new ErrorGraffleExtensionEntryHook({ issue: ExtensionEntryHookIssue.multipleParameters })
  }
  const p = x.parameters[0]
  if (!p) {
    return new ErrorGraffleExtensionEntryHook({ issue: ExtensionEntryHookIssue.noParameters })
  } else {
    if (p.type === `name`) {
      return new ErrorGraffleExtensionEntryHook({ issue: ExtensionEntryHookIssue.notDestructured })
    } else {
      if (p.names.length === 0) {
        return new ErrorGraffleExtensionEntryHook({ issue: ExtensionEntryHookIssue.destructuredWithoutEntryHook })
      }
      const hooks = p.names.filter(_ => hookNames.includes(_ as any)) as HookName[]

      if (hooks.length > 1) {
        return new ErrorGraffleExtensionEntryHook({ issue: ExtensionEntryHookIssue.multipleDestructuredHookNames })
      }
      const hook = hooks[0]
      if (!hook) {
        return new ErrorGraffleExtensionEntryHook({ issue: ExtensionEntryHookIssue.destructuredWithoutEntryHook })
      } else {
        return hook
      }
    }
  }
}
