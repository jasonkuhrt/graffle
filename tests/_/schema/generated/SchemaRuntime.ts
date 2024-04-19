/* eslint-disable */

import * as $ from '../../../../src/entrypoints/alpha/schema.js'
import * as $Scalar from './Scalar.js'

export const Case = $.Enum(`Case`, [`ErrorOne`, `ErrorTwo`, `Object1`])

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Bar = $.Object$(`Bar`, {
  int: $.field($.Output.Nullable($Scalar.Int)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const DateObject1 = $.Object$(`DateObject1`, {
  date1: $.field($.Output.Nullable($Scalar.Date)),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const ErrorOne = $.Object$(`ErrorOne`, {
  infoId: $.field($.Output.Nullable($Scalar.ID)),
  message: $.field($Scalar.String),
})

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const ErrorTwo = $.Object$(`ErrorTwo`, {
  infoInt: $.field($.Output.Nullable($Scalar.Int)),
  message: $.field($Scalar.String),
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

// @ts-ignore - circular types cannot infer. Ignore in case there are any. This comment is always added, it does not indicate if this particular type could infer or not.
export const Result = $.Union(`Result`, [ErrorOne, ErrorTwo, Object1])

export const Error = $.Interface(`Error`, { message: $.field($Scalar.String) }, [ErrorOne, ErrorTwo])
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
  result: $.field($.Output.Nullable(() => Result), $.Args({ case: Case })),
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
    ErrorOne,
    ErrorTwo,
    Foo,
    Object1,
    Object1ImplementingInterface,
    Object2ImplementingInterface,
  },
  unions: {
    FooBarUnion,
    Result,
  },
  interfaces: {
    Error,
    Interface,
  },
  error: {
    objects: {
      ErrorOne,
      ErrorTwo,
    },
  },
}
