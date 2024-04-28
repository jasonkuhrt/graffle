// import type { Schema } from '../1_Schema/__.js'
// import { readMaybeThunk } from '../1_Schema/core/helpers.js'
// import type { SelectionSet } from './__.js'
// import type { GraphQLObjectSelection } from './encode.js'
// import type { Args } from './types.js'

// namespace SSValue {
//   export type Obj = {
//     $?: Args2
//   }
//   export type Args2 = Record<string, Arg>
//   export type Arg = boolean | Arg[] | { [key: string]: Arg }
// }

// export const encode = (
//   input: {
//     index: Schema.Object$2
//     documentObject: SelectionSet.Print.GraphQLObjectSelection
//   },
// ): GraphQLObjectSelection => {
//   return Object.fromEntries(
//     Object.entries(input.documentObject).map(([fieldName, fieldValue]) => {
//       if (typeof fieldValue === `object`) {
//         if (`$` in fieldValue) {
//           const field = input.index.fields[fieldName]
//           if (!field?.args) throw new Error(`Field has no args: ${fieldName}`)
//           if (!field) throw new Error(`Field not found: ${fieldName}`) // eslint-disable-line
//           // @ts-expect-error fixme
//           fieldValue.$ = encodeCustomScalarsArgs(field.args, fieldValue.$)
//           return [fieldName, fieldValue]
//         }
//         // todo test nested inputs case
//         return [fieldName, encode({ index: input.index, documentObject: fieldValue })]
//       }
//       return [fieldName, fieldValue]
//     }),
//   )
// }

// const encodeCustomScalarsArgs = (indexArgs: Args<any>, valueArgs: SSValue.Args2): object => {
//   return Object.fromEntries(
//     Object.entries(valueArgs).map(([argName, argValue]) => {
//       // @ts-expect-error fixme
//       const indexArg = indexArgs.fields[argName] // eslint-disable-line
//       if (!indexArg) throw new Error(`Arg not found: ${argName}`)
//       return [argName, encodeCustomScalarsArgValue(indexArg, argValue)]
//     }),
//   )
// }

// const encodeCustomScalarsArgValue = (indexArgMaybeThunk: Schema.Input.Any, argValue: null | SSValue.Arg): any => {
//   if (argValue === null) return null // todo could check if index agrees is nullable.
//   const indexArg = readMaybeThunk(indexArgMaybeThunk)

//   switch (indexArg.kind) {
//     case `nullable`:
//       return encodeCustomScalarsArgValue(indexArg.type, argValue)
//     case `list`: {
//       if (!Array.isArray(argValue)) throw new Error(`Expected array. Got: ${String(argValue)}`)
//       return argValue.map(_ => encodeCustomScalarsArgValue(indexArg.type, _))
//     }
//     case `InputObject`: {
//       // dprint-ignore
//       if (typeof argValue !== `object` || Array.isArray(argValue)) throw new Error(`Expected object. Got: ${String(argValue)}`)
//       const fields = Object.fromEntries(Object.entries(indexArg.fields).map(([k, v]) => [k, v.type])) // eslint-disable-line
//       return encodeCustomScalarsArgs({ fields }, argValue)
//     }
//     case `Enum`: {
//       return argValue
//     }
//     case `Scalar`: {
//       // @ts-expect-error fixme
//       return indexArg.codec.encode(argValue)
//     }
//     default:
//       throw new Error(`Unsupported arg kind: ${JSON.stringify(indexArg)}`)
//   }
// }
