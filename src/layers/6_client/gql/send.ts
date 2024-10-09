import type { Grafaid } from '../../../lib/grafaid/__.js'
import { isString } from '../../../lib/prelude.js'
import type { ResolveOutputGql } from '../handleOutput.js'
import type { Config } from '../Settings/Config.js'

// dprint-ignore
export type SendArguments<$TypedDocument extends Grafaid.Nodes.Typed.TypedDocument> =
	SendArguments_<Grafaid.Nodes.Typed.VariablesOf<$TypedDocument>>

// dprint-ignore
type SendArguments_<$Variables extends Grafaid.Nodes.Typed.Variables> =
	SendArguments__<$Variables, Grafaid.Nodes.Typed.GetVariablesInputKind<$Variables>>

// dprint-ignore
type SendArguments__<$Variables extends Grafaid.Nodes.Typed.Variables, $VariablesKind extends Grafaid.Nodes.Typed.VariablesInputKind> =
		$VariablesKind extends 'none'      ? ([operationName?: string]) :
		$VariablesKind extends 'optional'  ? ([operationName?: string] | [operationName?: string, variables?: $Variables] | [variables?: $Variables]) :
		$VariablesKind extends 'required'  ? ([operationName: string, variables: $Variables] | [variables: $Variables]) :
		                                      never

// dprint-ignore
export interface DocumentController<$Config extends Config, $TypedDocument extends Grafaid.Nodes.Typed.TypedDocument> {
  send(...args: SendArguments<$TypedDocument>): Promise<ResolveOutputGql<$Config, Grafaid.Nodes.Typed.ResultOf<$TypedDocument>>>
}

export type sendArgumentsImplementation =
  | []
  | [string]
  | [Grafaid.Nodes.Typed.Variables]
  | [
    string,
    Grafaid.Nodes.Typed.Variables,
  ]

export const resolveSendArguments = (args: sendArgumentsImplementation) => {
  const operationName = isString(args[0]) ? args[0] : undefined
  const variables = isString(args[0]) ? args[1] : args[0]
  return {
    operationName,
    variables,
  }
}
