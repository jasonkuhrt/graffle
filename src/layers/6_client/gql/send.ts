import { isString } from '../../../lib/prelude.js'
import type { TypedDocument } from '../../../lib/typed-document/__.js'

// dprint-ignore
export type SendArguments<$TypedDocument extends TypedDocument.TypedDocument> =
	SendArguments_<TypedDocument.VariablesOf<$TypedDocument>>

// dprint-ignore
type SendArguments_<$Variables extends TypedDocument.Variables> =
	SendArguments__<$Variables, TypedDocument.GetVariablesInputKind<$Variables>>

// dprint-ignore
type SendArguments__<$Variables extends TypedDocument.Variables, $VariablesKind extends TypedDocument.VariablesInputKind> =
		$VariablesKind extends 'none'      ? ([operationName?: string] | []) :
		$VariablesKind extends 'optional'  ? ([operationName?: string] | [operationName?: string, variables?: $Variables] | [variables?: $Variables] | []) :
		$VariablesKind extends 'required'  ? ([operationName: string, variables: $Variables] | [variables: $Variables]) :
		                                      never

// dprint-ignore
export interface DocumentController<$TypedDocument extends TypedDocument.TypedDocument> {
  send(...args: SendArguments<$TypedDocument>): Promise<TypedDocument.ResultOf<$TypedDocument>>
}

export type sendArgumentsImplementation = [] | [string] | [TypedDocument.Variables] | [string, TypedDocument.Variables]

export const resolveSendArguments = (args: sendArgumentsImplementation) => {
  const operationName = isString(args[0]) ? args[0] : undefined
  const variables = isString(args[0]) ? args[1] : args[0]
  return {
    operationName,
    variables,
  }
}
