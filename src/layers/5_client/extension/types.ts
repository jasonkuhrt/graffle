import type { SomeAsyncFunction } from '../../../lib/prelude.js'
import type { NetworkRequest, NetworkRequestInput } from '../../0_functions/request.js'

const HookNamePropertySymbol = Symbol(`HookNameProperty`)
type HookNamePropertySymbol = typeof HookNamePropertySymbol

export type Hook<
  $Name extends HookName = HookName,
  $Fn extends SomeAsyncFunction = SomeAsyncFunction,
  $Input extends object = object,
> = $Fn & {
  [HookNamePropertySymbol]: $Name
  input: $Input
}

export const getHookName = (hook: Hook): HookName => hook[HookNamePropertySymbol]

export const isHook = (value: unknown): value is Hook => {
  return value ? typeof value === `object` ? HookNamePropertySymbol in value : false : false
}

export type NetworkRequestHook = Hook<NetworkRequest, NetworkRequestInput>

export type Extension = (hooks: { request: NetworkRequestHook }) => Promise<any>

export const hookNameEnum = {
  request: `request`,
  fetch: `fetch`,
} as const

export const hookNames = Object.values(hookNameEnum)

export type HookName = keyof typeof hookNameEnum

export const hooksOrderedBySequence: HookName[] = [`request`, `fetch`]
