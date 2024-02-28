import { expectTypeOf, test } from 'vitest'
import type { Schema } from './__.js'

test(`NameParse`, () => {
  expectTypeOf<Schema.NameParse<'a'>>().toEqualTypeOf<'a'>()
  expectTypeOf<Schema.NameParse<'a1'>>().toEqualTypeOf<'a1'>()
  expectTypeOf<Schema.NameParse<'A'>>().toEqualTypeOf<'A'>()
  expectTypeOf<Schema.NameParse<'aa'>>().toEqualTypeOf<'aa'>()
  expectTypeOf<Schema.NameParse<'a_'>>().toEqualTypeOf<'a_'>()
  expectTypeOf<Schema.NameParse<'a__'>>().toEqualTypeOf<'a__'>()
  expectTypeOf<Schema.NameParse<'a__b'>>().toEqualTypeOf<'a__b'>()
  expectTypeOf<Schema.NameParse<''>>().toEqualTypeOf<never>()
  expectTypeOf<Schema.NameParse<'1'>>().toEqualTypeOf<never>()
  expectTypeOf<Schema.NameParse<'1_a'>>().toEqualTypeOf<never>()
  expectTypeOf<Schema.NameParse<'$'>>().toEqualTypeOf<never>()
  expectTypeOf<Schema.NameParse<'$a'>>().toEqualTypeOf<never>()
})
