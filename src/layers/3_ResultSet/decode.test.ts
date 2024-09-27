import { expect, test } from 'vitest'
import { $Index } from '../../../tests/_/schemas/kitchen-sink/graffle/modules/SchemaRuntime.js'
import type * as SelectionSets from '../../../tests/_/schemas/kitchen-sink/graffle/modules/SelectionSets.js'
import { decode } from './decode.js'

test.each<[selectionSet: SelectionSets.Query, data: object]>([
  [{ object: { id: true } }, { object: { id: `x` } }],
  [{ id: [`x`, true] }, { x: `foo` }],
  [{ listInt: [`x`, true] }, { x: [1] }],
  [{ objectNested: { object: { id: [`x`, true] } } }, { objectNested: { object: { x: `x` } } }],
  [{ ___: { __typename: true } }, { __typename: `Query` }],
  [{ ___: { __typename: [`type`, true] } }, { type: `Query` }],
  [{ unionFooBar: { ___on_Foo: { id: true } } }, { unionFooBar: { id: `x` } }],
  [{ unionFooBar: { ___on_Foo: { id: true } } }, { unionFooBar: null }],
  [{ interface: { ___on_Object1ImplementingInterface: { id: true } } }, { interface: { id: `x` } }],
  [{ abcEnum: true }, { abcEnum: `foo` }],
])(`%s -----> %s`, (selectionSet, data) => {
  // @ts-expect-error fixme
  expect(decode($Index.Root.Query, selectionSet, data)).toEqual(data)
})
