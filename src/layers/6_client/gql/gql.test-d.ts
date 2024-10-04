import { kitchenSink as g } from '../../../../tests/_/helpers.js'
import { AssertTypeOf } from '../../../lib/assert-equal.js'
import type { TypedDocument } from '../../../lib/typed-document/__.js'

type D = { id: 0 }

const d1 = 0 as any as TypedDocument.Node<{ id: 0 }, {}>

AssertTypeOf<D | null>(await g.gql(d1).send())
// @ts-expect-error - variables not allowed.
await g.gql(d1).send({})

//
//
//

const d2 = 0 as any as TypedDocument.Node<{ id: 0 }, { x?: 0 }>

AssertTypeOf<D | null>(await g.gql(d2).send())
AssertTypeOf<D | null>(await g.gql(d2).send({}))
AssertTypeOf<D | null>(await g.gql(d2).send({ x: 0 }))
AssertTypeOf<D | null>(await g.gql(d2).send({ x: 0 }))
// @ts-expect-error - wrong type
await g.gql(d2).send({ filter: `wrong type` })

//
//
//

const d3 = 0 as any as TypedDocument.Node<{ id: 0 }, { x: 0 }>

AssertTypeOf<D | null>(await g.gql(d3).send({ x: 0 }))
// @ts-expect-error - missing argument
AssertTypeOf<D | null>(await g.gql(d3).send({}))

//
//
//

// dprint-ignore
{
  AssertTypeOf<D | null>(await g.gql<TypedDocument.Query<D, { x: 1 }>               >``.send({ x: 1 }))
  AssertTypeOf<D | null>(await g.gql<TypedDocument.Query<D, { x?: 1 }>              >``.send())
  AssertTypeOf<D | null>(await g.gql<TypedDocument.Query<D, { x?: 1 }>              >``.send({ x: 1 }))
  AssertTypeOf<D | null>(await g.gql<TypedDocument.Query<D, {}>                     >``.send())
  AssertTypeOf<D | null>(await g.gql<TypedDocument.Query<D, TypedDocument.Variables>>``.send())
  AssertTypeOf<D | null>(await g.gql<TypedDocument.Query<D, TypedDocument.Variables>>``.send({ x: 1 }))
  AssertTypeOf<D | null>(await g.gql<TypedDocument.Query<D, TypedDocument.Variables>>``.send(`abc`, { x: 1 }))
	// @ts-expect-error - wrong argument type
  await g.gql<TypedDocument.Query<D, { x: 1 }>               >``.send({ x: 2 })

  AssertTypeOf<D | null>(await g.gql<TypedDocument.Node<D, { x: 1 }>               >``.send({ x: 1 }))
  AssertTypeOf<D | null>(await g.gql<TypedDocument.Node<D, { x?: 1 }>              >``.send())
  AssertTypeOf<D | null>(await g.gql<TypedDocument.Node<D, { x?: 1 }>              >``.send({ x: 1 }))
  AssertTypeOf<D | null>(await g.gql<TypedDocument.Node<D, {}>                     >``.send())
  AssertTypeOf<D | null>(await g.gql<TypedDocument.Node<D, TypedDocument.Variables>>``.send())
  AssertTypeOf<D | null>(await g.gql<TypedDocument.Node<D, TypedDocument.Variables>>``.send({ x: 1 }))
  AssertTypeOf<D | null>(await g.gql<TypedDocument.Node<D, TypedDocument.Variables>>``.send(`abc`, { x: 1 }))
	// @ts-expect-error - wrong argument type
  await g.gql<TypedDocument.Node<D, { x: 1 }>               >``.send({ x: 2 })

  AssertTypeOf<D | null>(await g.gql<TypedDocument.String<D, { x: 1 }>               >``.send({ x: 1 }))
  AssertTypeOf<D | null>(await g.gql<TypedDocument.String<D, { x?: 1 }>              >``.send())
  AssertTypeOf<D | null>(await g.gql<TypedDocument.String<D, { x?: 1 }>              >``.send({ x: 1 }))
  AssertTypeOf<D | null>(await g.gql<TypedDocument.String<D, {}>                     >``.send())
  AssertTypeOf<D | null>(await g.gql<TypedDocument.String<D, TypedDocument.Variables>>``.send()) // eslint-disable-line
  AssertTypeOf<D | null>(await g.gql<TypedDocument.String<D, TypedDocument.Variables>>``.send({ x: 1 })) // eslint-disable-line
  AssertTypeOf<D | null>(await g.gql<TypedDocument.String<D, TypedDocument.Variables>>``.send(`abc`, { x: 1 })) // eslint-disable-line
	// @ts-expect-error - wrong argument type
  await g.gql<TypedDocument.String<D, { x: 1 }>               >``.send({ x: 2 })

}
