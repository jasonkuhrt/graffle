/* eslint-disable */
import { isString } from 'es-toolkit'
import { gql as gqlf } from './src/layers/6_helpers/gql.js'
import { TypedDocument } from './src/lib/typed-document/__.js'

// Types

// dprint-ignore
interface gql {
  <$Document extends TypedDocument.TypedDocument<any, any>>(document: $Document): DocumentController<$Document>
  <$Document extends TypedDocument.TypedDocument<any, any>>(parts: TemplateStringsArray, ...args: unknown[]): DocumentController<$Document>
}

type gqlArguments = [TypedDocument.TypedDocument<any, any>] | [TemplateStringsArray, ...unknown[]]

const resolveGqlArguments = (args: gqlArguments) => {
  const document = args[0]
  const operationName = isString(args[0]) ? args[0] : undefined
  const variables = isString(args[0]) ? args[1] : args[0]
  return {
    document,
    operationName,
    variables,
  }
}

// dprint-ignore
type SendArguments<$TypedDocument extends TypedDocument.TypedDocument<any, any>> =
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
interface DocumentController<$TypedDocument extends TypedDocument.TypedDocument<any, any>> {
  send(...args: SendArguments<$TypedDocument>): Promise<TypedDocument.ResultOf<$TypedDocument>>
}

type sendArgumentsImplementation = [] | [string] | [TypedDocument.Variables] | [string, TypedDocument.Variables]

const resolveSendArguments = (args: sendArgumentsImplementation) => {
  const operationName = isString(args[0]) ? args[0] : undefined
  const variables = isString(args[0]) ? args[1] : args[0]
  return {
    operationName,
    variables,
  }
}

// Implementation

const gql: gql = (...args: gqlArguments) => {
  const { document, operationName, variables } = resolveGqlArguments(args)

  return {
    send: async (...args: sendArgumentsImplementation) => {
      const { operationName, variables } = resolveSendArguments(args)
      return await Promise.resolve({
        id: 1,
      })
    },
  } as any
}

const isTemplateStringArray = (arg: any): arg is TemplateStringsArray => {
  return Array.isArray(arg) && 'raw' in arg && arg.raw !== undefined
}

const joinTemplateStringArrayAndArgs = (templateParts: TemplateStringsArray, templateArgs: unknown[]): string => {
  return templateParts.reduce(
    (string, part, index) => `${string}${part}${index in templateArgs ? String(templateArgs[index]) : ``}`,
    ``,
  )
}

const graffle = {
  gql,
}

// Examples

{
  const data = await graffle
    .gql`
			query pokemonByName ($Name: String!) {
				pokemonByName (name: $Name) {
					name
					continent {
						name
					}
				}
			}
		`
    .send({
      name: `Pikachu`,
    })

  console.log(data)
}

{
  const data = await graffle
    .gql`
			query pokemonByName ($Name: String!) {
				pokemonByName (name: $Name) {
					name
					continent {
						name
					}
				}
			}
		`
    .send(`pokemonByName`, {
      name: `Pikachu`,
    })
  console.log(data)
}

{
  const document = gqlf`
		query pokemonByName ($Name: String!) {
			pokemonByName (name: $Name) {
				name
				continent {
					name
				}
			}
		}
	`
  const result = await graffle.gql(document).send()
  console.log(result)
}

// Prepared DocumentNode

{
  const document = gqlf<{ id: number }, { foo: boolean }>`
		query pokemonByName ($Name: String!) {
			pokemonByName (name: $Name) {
				name
				continent {
					name
				}
			}
		}
	`
  const result = await graffle.gql(document).send({})
  console.log(result)
}
