import { AssertEqual } from '../../../lib/assert-equal.js'
import type { Grafaid } from '../../../lib/grafaid/__.js'
import type { SendArguments } from './send.js'

AssertEqual<
  SendArguments<Grafaid.Nodes.Typed.Query<{ y: 0 }, { x: 1 }>>,
  [string, { x: 1 }] | [{ x: 1 }]
>()
AssertEqual<
  SendArguments<Grafaid.Nodes.Typed.Query<{ y: 0 }, { x?: 1 }>>,
  [x?: string] | [x?: string, x?: { x?: 1 }] | [x?: { x?: 1 }]
>()
AssertEqual<
  SendArguments<Grafaid.Nodes.Typed.Query<{ y: 0 }, {}>>,
  [x?: string]
>()
AssertEqual<
  SendArguments<Grafaid.Nodes.Typed.Query<{ y: 0 }, Grafaid.Nodes.Typed.Variables>>,
  [x?: string] | [x?: string, x?: Grafaid.Nodes.Typed.Variables] | [x?: Grafaid.Nodes.Typed.Variables]
>()
