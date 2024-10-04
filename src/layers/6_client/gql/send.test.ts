import { AssertEqual } from '../../../lib/assert-equal.js'
import type { TypedDocument } from '../../../lib/typed-document/__.js'
import type { SendArguments } from './send.js'

AssertEqual<
  SendArguments<TypedDocument.TypedQueryDocumentNode<{ id: number }, { x: 1 }>>,
  [string, { x: 1 }] | [{ x: 1 }]
>()
AssertEqual<
  SendArguments<TypedDocument.TypedQueryDocumentNode<{ id: number }, { x?: 1 }>>,
  [] | [x?: string] | [x?: string, x?: { x?: 1 }] | [x?: { x?: 1 }]
>()
AssertEqual<
  SendArguments<TypedDocument.TypedQueryDocumentNode<{ id: number }, {}>>,
  [] | [x?: string]
>()
AssertEqual<
  SendArguments<TypedDocument.TypedQueryDocumentNode<{ id: number }, TypedDocument.Variables>>,
  [] | [x?: string] | [x?: string, x?: TypedDocument.Variables] | [x?: TypedDocument.Variables]
>()
