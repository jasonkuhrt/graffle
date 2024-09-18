import type { RootTypeNameToOperationName } from '../../lib/graphql.js'
import type { Exact } from '../../lib/prelude.js'
import type { Schema } from '../1_Schema/__.js'
import type { SelectionSet } from '../3_SelectionSet/__.js'
import type { ResultSet } from '../4_ResultSet/__.js'
import type { ResolveOutputReturnRootField, ResolveOutputReturnRootType, SimplifyOutput } from './handleOutput.js'
import type { AugmentRootTypeSelectionWithTypename, Config, CreateSelectionTypename } from './Settings/Config.js'

// dprint-ignore
export type BuilderRequestMethodsGeneratedRootTypes<$Config extends Config, $Index extends Schema.Index> = {
  [$RootType in $Index['RootUnion'] as RootTypeNameToOperationName[$RootType['fields']['__typename']['type']['type']]]:
		RootTypeMethods<$Config, $Index, $RootType>
}

// dprint-ignore
type RootTypeMethods<$Config extends Config, $Index extends Schema.Index, $RootType extends Schema.Output.RootType> =
(
  & {
      $batch: RootTypeMethod<$Config, $Index, $RootType>
    }
  & RootTypeFieldMethods<$Config, $Index, $RootType>
)

// dprint-ignore
export type RootTypeMethod<$Config extends Config, $Index extends Schema.Index, $RootType extends Schema.Output.RootType> =
  <$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.RootViaObject<$Index, $RootType>>) =>
    Promise<
      ResolveOutputReturnRootType<$Config, $Index, ResultSet.RootViaObject<AugmentRootTypeSelectionWithTypename<$Config,$Index,$RootType,$SelectionSet>, $Index, $RootType>>
    >

type RootTypeFieldMethods<
  $Config extends Config,
  $Index extends Schema.Index,
  $RootType extends Schema.Output.RootType,
> = {
  [$RootTypeFieldName in keyof $RootType['fields'] & string]: RootTypeFieldMethod<{
    Config: $Config
    Index: $Index
    RootTypeFieldName: $RootTypeFieldName
    Field: $RootType['fields'][$RootTypeFieldName]
  }>
}

type RootTypeFieldContext = {
  Config: Config
  Index: Schema.Index
  RootTypeFieldName: string
  Field: Schema.SomeField
}

// dprint-ignore
type RootTypeFieldMethod<$Context extends RootTypeFieldContext> =
  RootTypeFieldMethod_<$Context, $Context['Field']['type']>

// dprint-ignore
type RootTypeFieldMethod_<$Context extends RootTypeFieldContext, $Type extends Schema.Output.Any> =
  $Type extends Schema.Output.Nullable<infer $InnerType>    ? RootTypeFieldMethod_<$Context, $InnerType> : 
  $Type extends Schema.Output.List<infer $InnerType>        ? RootTypeFieldMethod_<$Context, $InnerType> :
  $Type extends Schema.Scalar.Any                           ? ScalarFieldMethod<$Context> :
  // todo test this case
  $Type extends Schema.__typename                           ? ScalarFieldMethod<$Context> :
                                                              ObjectLikeFieldMethod<$Context>

// If this type is not locally defined, apparently it affects the computed TS type.
// This exact same utility type used via import leads to different results....?!
type SimplifyOutputUnionLocal<T> = T extends any ? SimplifyOutput<T> : never

// dprint-ignore
type ObjectLikeFieldMethod<$Context extends RootTypeFieldContext> =
  <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSet.Field<$Context['Field'], $Context['Index'], { hideDirectives: true }>>) =>
    Promise<SimplifyOutputUnionLocal<ReturnModeForFieldMethod<$Context, ResultSet.Field<$SelectionSet & CreateSelectionTypename<$Context['Config'],$Context['Index']>, $Context['Field'], $Context['Index']>>>>

// dprint-ignore
type ScalarFieldMethod<$Context extends RootTypeFieldContext> =
  $Context['Field']['args'] extends Schema.Args<any>            ? $Context['Field']['args']['isFieldsAllNullable'] extends true  ? <$SelectionSet>(args?: Exact<$SelectionSet, SelectionSet.Args<$Context['Field']['args']>>) => Promise<ReturnModeForFieldMethod<$Context, ResultSet.Field<$SelectionSet, $Context['Field'], $Context['Index']>>> :
                                                                                                                  <$SelectionSet>(args:  Exact<$SelectionSet, SelectionSet.Args<$Context['Field']['args']>>) => Promise<ReturnModeForFieldMethod<$Context, ResultSet.Field<$SelectionSet, $Context['Field'], $Context['Index']>>> :
                                                                  (() => Promise<ReturnModeForFieldMethod<$Context, ResultSet.Field<true, $Context['Field'], $Context['Index']>>>)
// dprint-ignore
type ReturnModeForFieldMethod<$Context extends RootTypeFieldContext, $Data> =
  ResolveOutputReturnRootField<$Context['Config'], $Context['Index'], $Data, { [k in $Context['RootTypeFieldName']] : $Data }>
