import * as _ from '../../../../../src/Schema/__.js'
import * as $Scalar from './Scalar.js'

export const ABCEnum = _.Enum(`ABCEnum`, [`A`, `B`, `C`])

export const InputObject = _.InputObject(`InputObject`, {
  id: _.Input.field(_.Input.Nullable($Scalar.ID)),
  idRequired: _.Input.field($Scalar.ID),
  date: _.Input.field(_.Input.Nullable($Scalar.Date)),
  dateRequired: _.Input.field($Scalar.Date),
})

export const DateObject1 = _.Obj(`DateObject1`, {
  date1: _.Output.field(_.Output.Nullable($Scalar.Date)),
})

export const DateObject2 = _.Obj(`DateObject2`, {
  date2: _.Output.field(_.Output.Nullable($Scalar.Date)),
})

export const Foo = _.Obj(`Foo`, {
  id: _.Output.field(_.Output.Nullable($Scalar.ID)),
})

export const Bar = _.Obj(`Bar`, {
  int: _.Output.field(_.Output.Nullable($Scalar.Int)),
})

export const ObjectNested = _.Obj(`ObjectNested`, {
  id: _.Output.field(_.Output.Nullable($Scalar.ID)),
  object: _.Output.field(_.Output.Nullable(() => Object1)),
})

export const lowerCaseObject = _.Obj(`lowerCaseObject`, {
  id: _.Output.field(_.Output.Nullable($Scalar.ID)),
})

export const lowerCaseObject2 = _.Obj(`lowerCaseObject2`, {
  int: _.Output.field(_.Output.Nullable($Scalar.Int)),
})

export const Object1 = _.Obj(`Object1`, {
  string: _.Output.field(_.Output.Nullable($Scalar.String)),
  int: _.Output.field(_.Output.Nullable($Scalar.Int)),
  float: _.Output.field(_.Output.Nullable($Scalar.Float)),
  boolean: _.Output.field(_.Output.Nullable($Scalar.Boolean)),
  id: _.Output.field(_.Output.Nullable($Scalar.ID)),
})

export const Object1ImplementingInterface = _.Obj(`Object1ImplementingInterface`, {
  id: _.Output.field(_.Output.Nullable($Scalar.ID)),
  int: _.Output.field(_.Output.Nullable($Scalar.Int)),
})

export const Object2ImplementingInterface = _.Obj(`Object2ImplementingInterface`, {
  id: _.Output.field(_.Output.Nullable($Scalar.ID)),
  boolean: _.Output.field(_.Output.Nullable($Scalar.Boolean)),
})

export const DateUnion = _.Union(`DateUnion`, [DateObject1, DateObject2])

export const FooBarUnion = _.Union(`FooBarUnion`, [Foo, Bar])

export const lowerCaseUnion = _.Union(`lowerCaseUnion`, [lowerCaseObject, lowerCaseObject2])

export const DateInterface1 = _.Interface(
  `DateInterface1`,
  { date1: _.Output.field(_.Output.Nullable($Scalar.Date)) },
  [DateObject1],
)
export const Interface = _.Interface(`Interface`, { id: _.Output.field(_.Output.Nullable($Scalar.ID)) }, [
  Object1ImplementingInterface,
  Object2ImplementingInterface,
])

export const Query = _.Obj(`Query`, {
  date: _.Output.field(_.Output.Nullable($Scalar.Date)),
  dateNonNull: _.Output.field($Scalar.Date),
  dateList: _.Output.field(_.Output.Nullable(_.Output.List(_.Output.Nullable($Scalar.Date)))),
  dateObject1: _.Output.field(_.Output.Nullable(() => DateObject1)),
  dateUnion: _.Output.field(_.Output.Nullable(() => DateUnion)),
  dateInterface1: _.Output.field(_.Output.Nullable(() => DateInterface1)),
  dateListNonNull: _.Output.field(_.Output.List($Scalar.Date)),
  dateArg: _.Output.field(_.Output.Nullable($Scalar.Date), _.Args({ date: _.Input.Nullable($Scalar.Date) })),
  dateArgNonNull: _.Output.field(_.Output.Nullable($Scalar.Date), _.Args({ date: $Scalar.Date })),
  dateArgList: _.Output.field(
    _.Output.Nullable($Scalar.Date),
    _.Args({ date: _.Input.Nullable(_.Input.List(_.Input.Nullable($Scalar.Date))) }),
  ),
  dateArgNonNullList: _.Output.field(
    _.Output.Nullable($Scalar.Date),
    _.Args({ date: _.Input.List(_.Input.Nullable($Scalar.Date)) }),
  ),
  dateArgNonNullListNonNull: _.Output.field(
    _.Output.Nullable($Scalar.Date),
    _.Args({ date: _.Input.List($Scalar.Date) }),
  ),
  dateArgInputObject: _.Output.field(_.Output.Nullable($Scalar.Date), _.Args({ input: _.Input.Nullable(InputObject) })),
  interface: _.Output.field(_.Output.Nullable(() => Interface)),
  id: _.Output.field(_.Output.Nullable($Scalar.ID)),
  idNonNull: _.Output.field($Scalar.ID),
  string: _.Output.field(_.Output.Nullable($Scalar.String)),
  stringWithRequiredArg: _.Output.field(_.Output.Nullable($Scalar.String), _.Args({ string: $Scalar.String })),
  stringWithArgs: _.Output.field(
    _.Output.Nullable($Scalar.String),
    _.Args({
      string: _.Input.Nullable($Scalar.String),
      int: _.Input.Nullable($Scalar.Int),
      float: _.Input.Nullable($Scalar.Float),
      boolean: _.Input.Nullable($Scalar.Boolean),
      id: _.Input.Nullable($Scalar.ID),
    }),
  ),
  stringWithArgEnum: _.Output.field(_.Output.Nullable($Scalar.String), _.Args({ ABCEnum: _.Input.Nullable(ABCEnum) })),
  stringWithListArg: _.Output.field(
    _.Output.Nullable($Scalar.String),
    _.Args({ ints: _.Input.Nullable(_.Input.List(_.Input.Nullable($Scalar.Int))) }),
  ),
  stringWithListArgRequired: _.Output.field(
    _.Output.Nullable($Scalar.String),
    _.Args({ ints: _.Input.List(_.Input.Nullable($Scalar.Int)) }),
  ),
  stringWithArgInputObject: _.Output.field(
    _.Output.Nullable($Scalar.String),
    _.Args({ input: _.Input.Nullable(InputObject) }),
  ),
  stringWithArgInputObjectRequired: _.Output.field(_.Output.Nullable($Scalar.String), _.Args({ input: InputObject })),
  listListIntNonNull: _.Output.field(_.Output.List(_.Output.List($Scalar.Int))),
  listListInt: _.Output.field(
    _.Output.Nullable(_.Output.List(_.Output.Nullable(_.Output.List(_.Output.Nullable($Scalar.Int))))),
  ),
  listInt: _.Output.field(_.Output.Nullable(_.Output.List(_.Output.Nullable($Scalar.Int)))),
  listIntNonNull: _.Output.field(_.Output.List($Scalar.Int)),
  object: _.Output.field(_.Output.Nullable(() => Object1)),
  objectNonNull: _.Output.field(() => Object1),
  objectNested: _.Output.field(_.Output.Nullable(() => ObjectNested)),
  objectWithArgs: _.Output.field(
    _.Output.Nullable(() => Object1),
    _.Args({
      string: _.Input.Nullable($Scalar.String),
      int: _.Input.Nullable($Scalar.Int),
      float: _.Input.Nullable($Scalar.Float),
      boolean: _.Input.Nullable($Scalar.Boolean),
      id: _.Input.Nullable($Scalar.ID),
    }),
  ),
  fooBarUnion: _.Output.field(_.Output.Nullable(() => FooBarUnion)),
  abcEnum: _.Output.field(_.Output.Nullable(ABCEnum)),
  lowerCaseUnion: _.Output.field(_.Output.Nullable(() => lowerCaseUnion)),
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
