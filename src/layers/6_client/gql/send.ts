import type { Grafaid } from '../../../lib/grafaid/__.js'
import { isString } from '../../../lib/prelude.js'
import type { ResolveOutputGql } from '../handleOutput.js'
import type { Config } from '../Settings/Config.js'

// dprint-ignore
export type SendArguments<$TypedDocument extends string | Grafaid.Document.Typed.TypedDocumentLike> =
  $TypedDocument extends string 
    ? ([operationName?: string] | [operationName?: string, variables?: Grafaid.Document.Typed.Variables] | [variables?: Grafaid.Document.Typed.Variables])
    : SendArguments_<Grafaid.Document.Typed.VariablesOf<$TypedDocument>>

// dprint-ignore
type SendArguments_<$Variables extends Grafaid.Document.Typed.Variables> =
	SendArguments__<$Variables, Grafaid.Document.Typed.GetVariablesInputKind<$Variables>>

// dprint-ignore
type SendArguments__<$Variables extends Grafaid.Document.Typed.Variables, $VariablesKind extends Grafaid.Document.Typed.VariablesInputKind> =
		$VariablesKind extends 'none'      ? ([operationName?: string]) :
		$VariablesKind extends 'optional'  ? ([operationName?: string] | [operationName?: string, variables?: $Variables] | [variables?: $Variables]) :
		$VariablesKind extends 'required'  ? ([operationName: string, variables: $Variables] | [variables: $Variables]) :
		                                      never

// dprint-ignore
export interface DocumentController<$Config extends Config, $TypedDocument extends Grafaid.Document.Typed.TypedDocumentLike> {
  send(...args: SendArguments<$TypedDocument>): Promise<ResolveOutputGql<$Config, Grafaid.Document.Typed.ResultOf<$TypedDocument>> & {}>
}

export type sendArgumentsImplementation =
  | []
  | [string]
  | [Grafaid.Document.Typed.Variables]
  | [
    string,
    Grafaid.Document.Typed.Variables,
  ]

export const resolveSendArguments = (args: sendArgumentsImplementation) => {
  const operationName = isString(args[0]) ? args[0] : undefined
  const variables = isString(args[0]) ? args[1] : args[0]
  return {
    operationName,
    variables,
  }
}
