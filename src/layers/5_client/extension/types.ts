import type { SomeAsyncFunction } from '../../../lib/prelude.js'
import type { NetworkRequest, NetworkRequestInput } from '../../0_functions/request.js'

export type Hook<$Fn extends SomeAsyncFunction, $Input extends object> = $Fn & { input: $Input }

export type NetworkRequestHook = Hook<NetworkRequest, NetworkRequestInput>

export type Extension = (hooks: { request: NetworkRequestHook }) => Promise<any>

export const hookNamesEnum = {
  request: `request`,
} as const

export const hookNames = Object.values(hookNamesEnum)

export type HookName = keyof typeof hookNamesEnum
