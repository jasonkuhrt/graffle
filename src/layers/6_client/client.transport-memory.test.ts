import { expectTypeOf } from 'vitest'
import { test } from '../../../tests/_/helpers.js'
import { schema } from '../../../tests/_/schemas/kitchen-sink/schema.js'
import { Graffle } from '../../entrypoints/main.js'
import { Transport } from '../5_request/types.js'

test(`anyware hooks are typed to memory transport`, () => {
  Graffle.create({ schema }).anyware(async ({ encode }) => {
    expectTypeOf(encode.input.transport).toEqualTypeOf(Transport.memory)
    const { pack } = await encode()
    expectTypeOf(pack.input.transport).toEqualTypeOf(Transport.memory)
    const { exchange } = await pack()
    expectTypeOf(exchange.input.transport).toEqualTypeOf(Transport.memory)
    // @ts-expect-error any
    exchange.input.request
    const { unpack } = await exchange()
    expectTypeOf(unpack.input.transport).toEqualTypeOf(Transport.memory)
    // @ts-expect-error any
    unpack.input.response
    const { decode } = await unpack()
    expectTypeOf(decode.input.transport).toEqualTypeOf(Transport.memory)
    // @ts-expect-error any
    decode.input.response
    const result = await decode()
    if (!(result instanceof Error)) {
      // @ts-expect-error any
      result.response
    }
    return result
  })
})

test(`cannot set headers in constructor`, () => {
  // todo: This error is poor for the user. It refers to schema not being a URL. The better message would be that headers is not allowed with memory transport.
  // @ts-expect-error headers not allowed with GraphQL schema
  Graffle.create({ schema, transport: { headers: { 'x-foo': `bar` } } })
})
