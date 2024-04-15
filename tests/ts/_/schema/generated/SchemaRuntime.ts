/* eslint-disable */

import * as $ from '../../../../../src/Schema/__.js'
import * as $Scalar from './Scalar.js'

export const ABCEnum = $.Enum(`ABCEnum`, [`A`, `B`, `C`])

export const InputObjectNested = $.InputObject(`InputObjectNested`, {
  InputObject: $.Input.field(() => $.Input.Nullable(InputObject)),
})

export const InputObjectNestedNonNull = $.InputObject(`InputObjectNestedNonNull`, {
  InputObject: $.Input.field(() => InputObject),
})

export const InputObject = $.InputObject(`InputObject`, {
  id: $.Input.field($.Input.Nullable($Scalar.ID)),
  idRequired: $.Input.field($Scalar.ID),
  date: $.Input.field($.Input.Nullable($Scalar.Date)),
  dateRequired: $.Input.field($Scalar.Date),
})

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const DateObject1 = $.Object$(`DateObject1`, {
  date1: $.field($.Output.Nullable($Scalar.Date)),
})

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const DateObject2 = $.Object$(`DateObject2`, {
  date2: $.field($.Output.Nullable($Scalar.Date)),
})

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const ObjectUnion = $.Object$(`ObjectUnion`, {
  fooBarUnion: $.field($.Output.Nullable(() => FooBarUnion)),
})

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Foo = $.Object$(`Foo`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
})

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Bar = $.Object$(`Bar`, {
  int: $.field($.Output.Nullable($Scalar.Int)),
})

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const ObjectNested = $.Object$(`ObjectNested`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
  object: $.field($.Output.Nullable(() => Object1)),
})

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const lowerCaseObject = $.Object$(`lowerCaseObject`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
})

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const lowerCaseObject2 = $.Object$(`lowerCaseObject2`, {
  int: $.field($.Output.Nullable($Scalar.Int)),
})

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Object1 = $.Object$(`Object1`, {
  string: $.field($.Output.Nullable($Scalar.String)),
  int: $.field($.Output.Nullable($Scalar.Int)),
  float: $.field($.Output.Nullable($Scalar.Float)),
  boolean: $.field($.Output.Nullable($Scalar.Boolean)),
  id: $.field($.Output.Nullable($Scalar.ID)),
})

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Object1ImplementingInterface = $.Object$(`Object1ImplementingInterface`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
  int: $.field($.Output.Nullable($Scalar.Int)),
})

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Object2ImplementingInterface = $.Object$(`Object2ImplementingInterface`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
  boolean: $.field($.Output.Nullable($Scalar.Boolean)),
})

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const DateUnion = $.Union(`DateUnion`, [DateObject1, DateObject2])

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const FooBarUnion = $.Union(`FooBarUnion`, [Foo, Bar])

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const lowerCaseUnion = $.Union(`lowerCaseUnion`, [lowerCaseObject, lowerCaseObject2])

export const DateInterface1 = $.Interface(`DateInterface1`, { date1: $.field($.Output.Nullable($Scalar.Date)) }, [
  DateObject1,
])
export const Interface = $.Interface(`Interface`, { id: $.field($.Output.Nullable($Scalar.ID)) }, [
  Object1ImplementingInterface,
  Object2ImplementingInterface,
])

// eslint-disable-next-line
// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Query = $.Object$(`Query`, {
  date: $.field($.Output.Nullable($Scalar.Date)),
  dateNonNull: $.field($Scalar.Date),
  dateList: $.field($.Output.Nullable($.Output.List($.Output.Nullable($Scalar.Date)))),
  dateObject1: $.field($.Output.Nullable(() => DateObject1)),
  dateUnion: $.field($.Output.Nullable(() => DateUnion)),
  dateInterface1: $.field($.Output.Nullable(() => DateInterface1)),
  dateListNonNull: $.field($.Output.List($Scalar.Date)),
  dateArg: $.field($.Output.Nullable($Scalar.Date), $.Args({ date: $.Input.Nullable($Scalar.Date) })),
  dateArgNonNull: $.field($.Output.Nullable($Scalar.Date), $.Args({ date: $Scalar.Date })),
  dateArgList: $.field(
    $.Output.Nullable($Scalar.Date),
    $.Args({ date: $.Input.Nullable($.Input.List($.Input.Nullable($Scalar.Date))) }),
  ),
  dateArgNonNullList: $.field(
    $.Output.Nullable($Scalar.Date),
    $.Args({ date: $.Input.List($.Input.Nullable($Scalar.Date)) }),
  ),
  dateArgNonNullListNonNull: $.field($.Output.Nullable($Scalar.Date), $.Args({ date: $.Input.List($Scalar.Date) })),
  dateArgInputObject: $.field($.Output.Nullable($Scalar.Date), $.Args({ input: $.Input.Nullable(InputObject) })),
  InputObjectNested: $.field($.Output.Nullable($Scalar.ID), $.Args({ input: $.Input.Nullable(InputObjectNested) })),
  InputObjectNestedNonNull: $.field($.Output.Nullable($Scalar.ID), $.Args({ input: InputObjectNested })),
  id: $.field($.Output.Nullable($Scalar.ID)),
  idNonNull: $.field($Scalar.ID),
  string: $.field($.Output.Nullable($Scalar.String)),
  stringWithRequiredArg: $.field($.Output.Nullable($Scalar.String), $.Args({ string: $Scalar.String })),
  stringWithArgs: $.field(
    $.Output.Nullable($Scalar.String),
    $.Args({
      string: $.Input.Nullable($Scalar.String),
      int: $.Input.Nullable($Scalar.Int),
      float: $.Input.Nullable($Scalar.Float),
      boolean: $.Input.Nullable($Scalar.Boolean),
      id: $.Input.Nullable($Scalar.ID),
    }),
  ),
  stringWithArgEnum: $.field($.Output.Nullable($Scalar.String), $.Args({ ABCEnum: $.Input.Nullable(ABCEnum) })),
  stringWithListArg: $.field(
    $.Output.Nullable($Scalar.String),
    $.Args({ ints: $.Input.Nullable($.Input.List($.Input.Nullable($Scalar.Int))) }),
  ),
  stringWithListArgRequired: $.field(
    $.Output.Nullable($Scalar.String),
    $.Args({ ints: $.Input.List($.Input.Nullable($Scalar.Int)) }),
  ),
  stringWithArgInputObject: $.field(
    $.Output.Nullable($Scalar.String),
    $.Args({ input: $.Input.Nullable(InputObject) }),
  ),
  stringWithArgInputObjectRequired: $.field($.Output.Nullable($Scalar.String), $.Args({ input: InputObject })),
  listListIntNonNull: $.field($.Output.List($.Output.List($Scalar.Int))),
  listListInt: $.field(
    $.Output.Nullable($.Output.List($.Output.Nullable($.Output.List($.Output.Nullable($Scalar.Int))))),
  ),
  listInt: $.field($.Output.Nullable($.Output.List($.Output.Nullable($Scalar.Int)))),
  listIntNonNull: $.field($.Output.List($Scalar.Int)),
  object: $.field($.Output.Nullable(() => Object1)),
  objectNonNull: $.field(() => Object1),
  objectNested: $.field($.Output.Nullable(() => ObjectNested)),
  objectWithArgs: $.field(
    $.Output.Nullable(() => Object1),
    $.Args({
      string: $.Input.Nullable($Scalar.String),
      int: $.Input.Nullable($Scalar.Int),
      float: $.Input.Nullable($Scalar.Float),
      boolean: $.Input.Nullable($Scalar.Boolean),
      id: $.Input.Nullable($Scalar.ID),
    }),
  ),
  fooBarUnion: $.field($.Output.Nullable(() => FooBarUnion)),
  objectList: $.field($.Output.Nullable($.Output.List($.Output.Nullable(() => Object1)))),
  objectListNonNull: $.field($.Output.List(() => Object1)),
  abcEnum: $.field($.Output.Nullable(ABCEnum)),
  lowerCaseUnion: $.field($.Output.Nullable(() => lowerCaseUnion)),
  interface: $.field($.Output.Nullable(() => Interface)),
  interfaceNonNull: $.field(() => Interface),
  unionFooBar: $.field($.Output.Nullable(() => FooBarUnion)),
  unionObject: $.field($.Output.Nullable(() => ObjectUnion)),
  unionFooBarNonNull: $.field(() => FooBarUnion),
  unionObjectNonNull: $.field(() => ObjectUnion),
})

export const $Index = {
  Root: {
    Query,
    Mutation: null,
    Subscription: null,
  },
  objects: {
    DateObject1,
    DateObject2,
    ObjectUnion,
    Foo,
    Bar,
    ObjectNested,
    lowerCaseObject,
    lowerCaseObject2,
    Object1,
    Object1ImplementingInterface,
    Object2ImplementingInterface,
  },
  unions: {
    DateUnion,
    FooBarUnion,
    lowerCaseUnion,
  },
}
