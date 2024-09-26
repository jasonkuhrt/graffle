import { expect, test } from 'vitest'
import { Graffle } from '../../../tests/_/schema/generated/__.js'
import { $Index } from '../../../tests/_/schema/generated/modules/SchemaRuntime.js'
import type * as SelectionSets from '../../../tests/_/schema/generated/modules/SelectionSets.js'
import { decode } from './decode.js'

test(`simple`, () => {
  const selectionSet = Graffle.Select.Query({ object: { id: true } })
  const data = { object: { id: `x` } }
  // @ts-expect-error fixme
  expect(decode($Index.Root.Query, selectionSet, data)).toEqual(data)
})

test.each<[selectionSet: SelectionSets.Query, data: object]>([
  [{ id: [`x`, true] }, { x: `foo` }],
  [{ listInt: [`x`, true] }, { x: [1] }],
  [{ objectNested: { object: { id: [`x`, true] } } }, { objectNested: { object: { x: `x` } } }],
])(`alias`, (selectionSet, data) => {
  // @ts-expect-error fixme
  expect(decode($Index.Root.Query, selectionSet, data)).toEqual(data)
})
