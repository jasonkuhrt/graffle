// import type { DirectiveLike } from './$types.js'

// export const name = `defer`

// export interface Defer extends DirectiveLike {
//   name: typeof name
//   args: {
//     if: boolean
//     label: string | undefined
//   }
// }

// export const create = (input: Input): Defer => {
//   const args = {
//     if: typeof input === `boolean` ? input : input.if === undefined ? true : input.if,
//     label: typeof input === `boolean` ? undefined : input.label,
//   }
//   return {
//     name,
//     args,
//   }
// }

// /**
//  * @see https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md#defer
//  */
// export type Input = boolean | {
//   if?: boolean
//   label?: string
// }

// export interface Field {
//   /**
//    * https://spec.graphql.org/draft/#sec--defer
//    */
//   $defer?: Input
// }
