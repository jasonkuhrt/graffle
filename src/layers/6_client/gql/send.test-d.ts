import { assertEqual } from '../../../lib/assert-equal.js'
import type { Grafaid } from '../../../lib/grafaid/__.js'
import type { SendArguments } from './send.js'

assertEqual<
  SendArguments<Grafaid.Document.Typed.Query<{ y: 0 }, { x: 1 }>>,
  [string, { x: 1 }] | [{ x: 1 }]
>()
assertEqual<
  SendArguments<Grafaid.Document.Typed.Query<{ y: 0 }, { x?: 1 }>>,
  [x?: string] | [x?: string, x?: { x?: 1 }] | [x?: { x?: 1 }]
>()
assertEqual<
  SendArguments<Grafaid.Document.Typed.Query<{ y: 0 }, {}>>,
  [x?: string]
>()
assertEqual<
  SendArguments<Grafaid.Document.Typed.Query<{ y: 0 }, Grafaid.Document.Typed.Variables>>,
  [x?: string] | [x?: string, x?: Grafaid.Document.Typed.Variables] | [x?: Grafaid.Document.Typed.Variables]
>()
assertEqual<
  SendArguments<string>,
  [x?: string] | [x?: string, x?: Grafaid.Document.Typed.Variables] | [x?: Grafaid.Document.Typed.Variables]
>()
