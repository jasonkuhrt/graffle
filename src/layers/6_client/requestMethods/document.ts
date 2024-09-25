import type { UnionToTuple } from 'type-fest'
import type { IsTupleMultiple } from '../../../lib/prelude.js'
import type { Schema } from '../../1_Schema/__.js'
import type { ResultSet } from '../../3_ResultSet/__.js'
import type { Document } from '../../4_document/__.js'
import type { ResolveOutputReturnRootType } from '../handleOutput.js'
import type { AddTypenameToSelectedRootTypeResultFields, Config } from '../Settings/Config.js'

// dprint-ignore
export type DocumentRunner<
  $$Config extends Config,
  $$Index extends Schema.Index,
  $$Document extends Document.SomeDocument,
  $$Name extends Document.GetOperationNames<$$Document> = Document.GetOperationNames<$$Document>
> = {
  run: <
    $Name extends $$Name,
    $Params extends (IsTupleMultiple<UnionToTuple<$$Name>> extends true ? [name: $Name] : ([] | [name: $Name | undefined])),
  >(...params: $Params) =>
    Promise<
      ResolveOutputReturnRootType<
        $$Config,
        $$Index,
        ResultSet.Root<
          AddTypenameToSelectedRootTypeResultFields<
            $$Config,
            $$Index,
            Document.GetRootTypeNameOfOperation<$$Document, $Name>,
            Document.GetOperation<$$Document, $Name>
          >,
          $$Index,
          Document.GetRootTypeNameOfOperation<$$Document, $Name>
        >
      >
    >
}

// todo maybe bring back these validations, but need to understand the perf impact

// // dprint-ignore
// export type Document<$Index extends Schema.Index> =
//   {
//     [name: string]:
//       $Index['Root']['Query'] extends null    ? { mutation: SelectionSet.Root<$Index, 'Mutation'> } :
//       $Index['Root']['Mutation'] extends null ? { query: SelectionSet.Root<$Index, 'Query'> } :
//                                                 MergeExclusive<
//                                                   {
//                                                     query: SelectionSet.Root<$Index, 'Query'>
//                                                   },
//                                                   {
//                                                     mutation: SelectionSet.Root<$Index, 'Mutation'>
//                                                   }
//                                                 >
//   }

// // dprint-ignore
// export type ValidateDocumentOperationNames<$Document> =
//   // This initial condition checks that the document is not already in an error state.
//   // Namely from for example { x: { mutation: { ... }}} where the schema has no mutations.
//   // Which is statically caught by the `Document` type. In that case the document type variable
//   // no longer functions per normal with regards to keyof utility, not returning exact keys of the object
//   // but instead this more general union. Not totally clear _why_, but we have tests covering this...
//   string | number extends keyof $Document
//     ? $Document
//     : keyof { [K in keyof $Document & string as Schema.Named.NameParse<K> extends never ? K : never]: K } extends never
//       ? $Document
//       : TSError<'ValidateDocumentOperationNames', `One or more Invalid operation name in document: ${keyof { [K in keyof $Document & string as Schema.Named.NameParse<K> extends never ? K : never]: K }}`>
