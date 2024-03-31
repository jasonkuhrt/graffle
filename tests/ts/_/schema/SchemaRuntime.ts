import * as _ from '../../../../src/Schema/__.js'
import * as $Scalar from './Scalar.js'

export const ABCEnum = _.Enum(`ABCEnum`, [`A`, `B`, `C`])

export const Query = _.Object(`Query`, {
  date: _.Output.field(_.Output.Nullable($Scalar.Date)),
  interface: _.Output.field(_.Output.Nullable(() => Interface)),
  id: _.Output.field(_.Output.Nullable($Scalar.ID)),
  idNonNull: _.Output.field($Scalar.ID),
  string: _.Output.field(_.Output.Nullable($Scalar.String)),
  stringWithRequiredArg: _.Output.field(_.Output.Nullable($Scalar.String)),
  stringWithArgs: _.Output.field(_.Output.Nullable($Scalar.String)),
  stringWithArgEnum: _.Output.field(_.Output.Nullable($Scalar.String)),
  stringWithListArg: _.Output.field(_.Output.Nullable($Scalar.String)),
  stringWithListArgRequired: _.Output.field(_.Output.Nullable($Scalar.String)),
  stringWithArgInputObject: _.Output.field(_.Output.Nullable($Scalar.String)),
  stringWithArgInputObjectRequired: _.Output.field(_.Output.Nullable($Scalar.String)),
  object: _.Output.field(_.Output.Nullable(() => Object)),
  listListIntNonNull: _.Output.field(_.Output.List(_.Output.List($Scalar.Int))),
  listListInt: _.Output.field(
    _.Output.Nullable(_.Output.List(_.Output.Nullable(_.Output.List(_.Output.Nullable($Scalar.Int))))),
  ),
  listInt: _.Output.field(_.Output.Nullable(_.Output.List(_.Output.Nullable($Scalar.Int)))),
  listIntNonNull: _.Output.field(_.Output.List($Scalar.Int)),
  objectNested: _.Output.field(_.Output.Nullable(() => ObjectNested)),
  objectNonNull: _.Output.field(() => Object),
  objectWithArgs: _.Output.field(_.Output.Nullable(() => Object)),
  fooBarUnion: _.Output.field(_.Output.Nullable(() => FooBarUnion)),
  abcEnum: _.Output.field(_.Output.Nullable(ABCEnum)),
  lowerCaseUnion: _.Output.field(_.Output.Nullable(() => lowerCaseUnion)),
})

export const Foo = _.Object(`Foo`, {
  id: _.Output.field(_.Output.Nullable($Scalar.ID)),
})

export const Bar = _.Object(`Bar`, {
  int: _.Output.field(_.Output.Nullable($Scalar.Int)),
})

export const ObjectNested = _.Object(`ObjectNested`, {
  id: _.Output.field(_.Output.Nullable($Scalar.ID)),
  object: _.Output.field(_.Output.Nullable(() => Object)),
})

export const lowerCaseObject = _.Object(`lowerCaseObject`, {
  id: _.Output.field(_.Output.Nullable($Scalar.ID)),
})

export const lowerCaseObject2 = _.Object(`lowerCaseObject2`, {
  int: _.Output.field(_.Output.Nullable($Scalar.Int)),
})

export const Object = _.Object(`Object`, {
  string: _.Output.field(_.Output.Nullable($Scalar.String)),
  int: _.Output.field(_.Output.Nullable($Scalar.Int)),
  float: _.Output.field(_.Output.Nullable($Scalar.Float)),
  boolean: _.Output.field(_.Output.Nullable($Scalar.Boolean)),
  id: _.Output.field(_.Output.Nullable($Scalar.ID)),
})

export const Object1ImplementingInterface = _.Object(`Object1ImplementingInterface`, {
  id: _.Output.field(_.Output.Nullable($Scalar.ID)),
  int: _.Output.field(_.Output.Nullable($Scalar.Int)),
})

export const Object2ImplementingInterface = _.Object(`Object2ImplementingInterface`, {
  id: _.Output.field(_.Output.Nullable($Scalar.ID)),
  boolean: _.Output.field(_.Output.Nullable($Scalar.Boolean)),
})

export const FooBarUnion = _.Union(`FooBarUnion`, [Foo, Bar])

export const lowerCaseUnion = _.Union(`lowerCaseUnion`, [lowerCaseObject, lowerCaseObject2])

export const Interface = _.Interface(`Interface`, { id: _.Output.field(_.Output.Nullable($Scalar.ID)) }, [
  Object1ImplementingInterface,
  Object2ImplementingInterface,
])

export const $Index = {
  Root: {
    Query,
    Mutation: null,
    Subscription: null,
  },
  objects: {
    Foo,
    Bar,
    ObjectNested,
    lowerCaseObject,
    lowerCaseObject2,
    Object,
    Object1ImplementingInterface,
    Object2ImplementingInterface,
  },
  unions: {
    FooBarUnion,
    lowerCaseUnion,
  },
}
