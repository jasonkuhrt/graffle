import { AssertEqual } from '../../../lib/assert-equal.js'
import type { Grafaid } from '../../../lib/grafaid/__.js'
import type { SendArguments } from './send.js'

AssertEqual<
  SendArguments<Grafaid.Document.Typed.Query<{ y: 0 }, { x: 1 }>>,
  [string, { x: 1 }] | [{ x: 1 }]
>()
AssertEqual<
  SendArguments<Grafaid.Document.Typed.Query<{ y: 0 }, { x?: 1 }>>,
  [x?: string] | [x?: string, x?: { x?: 1 }] | [x?: { x?: 1 }]
>()
AssertEqual<
  SendArguments<Grafaid.Document.Typed.Query<{ y: 0 }, {}>>,
  [x?: string]
>()
AssertEqual<
  SendArguments<Grafaid.Document.Typed.Query<{ y: 0 }, Grafaid.Document.Typed.Variables>>,
  [x?: string] | [x?: string, x?: Grafaid.Document.Typed.Variables] | [x?: Grafaid.Document.Typed.Variables]
>()
AssertEqual<
  SendArguments<string>,
  [x?: string] | [x?: string, x?: Grafaid.Document.Typed.Variables] | [x?: Grafaid.Document.Typed.Variables]
>()
