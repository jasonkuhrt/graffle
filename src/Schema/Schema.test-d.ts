import { expectTypeOf, test } from 'vitest'
import type { Schema } from './__.js'

test(`NameParse`, () => {
  expectTypeOf<Schema.NameParse<'a'>>().toEqualTypeOf<'a'>()
  expectTypeOf<Schema.NameParse<'A'>>().toEqualTypeOf<'A'>()
  expectTypeOf<Schema.NameParse<'aa'>>().toEqualTypeOf<'aa'>()
  expectTypeOf<Schema.NameParse<'a_'>>().toEqualTypeOf<'a_'>()
  expectTypeOf<Schema.NameParse<'a__'>>().toEqualTypeOf<'a__'>()
  expectTypeOf<Schema.NameParse<'a__b'>>().toEqualTypeOf<'a__b'>()
  expectTypeOf<Schema.NameParse<''>>().toEqualTypeOf<never>()
  expectTypeOf<Schema.NameParse<'_'>>().toEqualTypeOf<never>()
  expectTypeOf<Schema.NameParse<'$'>>().toEqualTypeOf<never>()
  expectTypeOf<Schema.NameParse<'$a'>>().toEqualTypeOf<never>()
  expectTypeOf<Schema.NameParse<'_a'>>().toEqualTypeOf<never>()
})
