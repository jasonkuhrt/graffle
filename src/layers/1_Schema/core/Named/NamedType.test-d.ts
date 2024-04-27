import { expectTypeOf, test } from 'vitest'
import type * as NamedType from './NamedType.js'

test(`NameParse`, () => {
  expectTypeOf<NamedType.NameParse<'a'>>().toEqualTypeOf<'a'>()
  expectTypeOf<NamedType.NameParse<'a1'>>().toEqualTypeOf<'a1'>()
  expectTypeOf<NamedType.NameParse<'A'>>().toEqualTypeOf<'A'>()
  expectTypeOf<NamedType.NameParse<'aa'>>().toEqualTypeOf<'aa'>()
  expectTypeOf<NamedType.NameParse<'a_'>>().toEqualTypeOf<'a_'>()
  expectTypeOf<NamedType.NameParse<'a__'>>().toEqualTypeOf<'a__'>()
  expectTypeOf<NamedType.NameParse<'a__b'>>().toEqualTypeOf<'a__b'>()
  expectTypeOf<NamedType.NameParse<''>>().toEqualTypeOf<never>()
  expectTypeOf<NamedType.NameParse<'1'>>().toEqualTypeOf<never>()
  expectTypeOf<NamedType.NameParse<'1_a'>>().toEqualTypeOf<never>()
  expectTypeOf<NamedType.NameParse<'$'>>().toEqualTypeOf<never>()
  expectTypeOf<NamedType.NameParse<'$a'>>().toEqualTypeOf<never>()
  expectTypeOf<NamedType.NameParse<'foo$'>>().toEqualTypeOf<never>()
})
