/* eslint-disable */

import * as $ from '../../../../src/Schema/__.js'
import * as $Scalar from './Scalar.js'

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Bar = $.Object$(`Bar`, {
  int: $.field($.Output.Nullable($Scalar.Int)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const DateObject1 = $.Object$(`DateObject1`, {
  date1: $.field($.Output.Nullable($Scalar.Date)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Foo = $.Object$(`Foo`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Object1 = $.Object$(`Object1`, {
  boolean: $.field($.Output.Nullable($Scalar.Boolean)),
  float: $.field($.Output.Nullable($Scalar.Float)),
  id: $.field($.Output.Nullable($Scalar.ID)),
  int: $.field($.Output.Nullable($Scalar.Int)),
  string: $.field($.Output.Nullable($Scalar.String)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Object1ImplementingInterface = $.Object$(`Object1ImplementingInterface`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
  int: $.field($.Output.Nullable($Scalar.Int)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Object2ImplementingInterface = $.Object$(`Object2ImplementingInterface`, {
  boolean: $.field($.Output.Nullable($Scalar.Boolean)),
  id: $.field($.Output.Nullable($Scalar.ID)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const FooBarUnion = $.Union(`FooBarUnion`, [Bar, Foo])

export const Interface = $.Interface(`Interface`, { id: $.field($.Output.Nullable($Scalar.ID)) }, [
  Object1ImplementingInterface,
  Object2ImplementingInterface,
])

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Mutation = $.Object$(`Mutation`, {
  id: $.field($.Output.Nullable($Scalar.ID)),
  idNonNull: $.field($Scalar.ID),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Query = $.Object$(`Query`, {
  date: $.field($.Output.Nullable($Scalar.Date)),
  dateArg: $.field($.Output.Nullable($Scalar.Date), $.Args({ date: $.Input.Nullable($Scalar.Date) })),
  dateArgNonNull: $.field($.Output.Nullable($Scalar.Date), $.Args({ date: $Scalar.Date })),
  dateNonNull: $.field($Scalar.Date),
  dateObject1: $.field($.Output.Nullable(() => DateObject1)),
  id: $.field($.Output.Nullable($Scalar.ID)),
  idNonNull: $.field($Scalar.ID),
  interface: $.field($.Output.Nullable(() => Interface)),
  objectWithArgs: $.field(
    $.Output.Nullable(() => Object1),
    $.Args({
      boolean: $.Input.Nullable($Scalar.Boolean),
      float: $.Input.Nullable($Scalar.Float),
      id: $.Input.Nullable($Scalar.ID),
      int: $.Input.Nullable($Scalar.Int),
      string: $.Input.Nullable($Scalar.String),
    }),
  ),
  unionFooBar: $.field($.Output.Nullable(() => FooBarUnion)),
})

export const $Index = {
  Root: {
    Query,
    Mutation,
    Subscription: null,
  },
  objects: {
    Bar,
    DateObject1,
    Foo,
    Object1,
    Object1ImplementingInterface,
    Object2ImplementingInterface,
  },
  unions: {
    FooBarUnion,
  },
  interfaces: {
    Interface,
  },
}
