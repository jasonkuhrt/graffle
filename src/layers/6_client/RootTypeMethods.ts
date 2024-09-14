import type { CamelCase } from 'type-fest'
import type { Exact } from '../../lib/prelude.js'
import type { TSError } from '../../lib/TSError.js'
import type { InputFieldsAllNullable, Schema } from '../1_Schema/__.js'
import type { SelectionSet } from '../3_SelectionSet/__.js'
import type { ResultSet } from '../4_ResultSet/__.js'
import type { ResolveOutputReturnRootField, ResolveOutputReturnRootType, SimplifyOutput } from './handleOutput.js'
import type { AugmentRootTypeSelectionWithTypename, Config, CreateSelectionTypename } from './Settings/Config.js'

type RootTypeFieldContext = {
  Config: Config
  Index: Schema.Index
  RootTypeName: Schema.RootTypeName
  RootTypeFieldName: string
  Field: Schema.SomeField
}

// dprint-ignore
export type BuilderRequestMethodsGeneratedRootTypes<$Config extends Config, $Index extends Schema.Index> = {
  // todo
  // [$OperationName in $Index['OperationsPresent'][number]]:
  //   RootTypeMethods<$Config, $Index, OperationNameToRootType<OperationName>>
  [$RootTypeName in $Index['RootTypesPresent'][number] as CamelCase<$RootTypeName>]:
		RootTypeMethods<$Config, $Index, $RootTypeName>
}

// dprint-ignore
export type RootTypeMethods<$Config extends Config, $Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName> =
  $Index['Root'][$RootTypeName] extends Schema.Object$2 ?
  (
  & {
      $batch: RootMethod<$Config, $Index, $RootTypeName>
    }
  & {
      [$RootTypeFieldName in keyof $Index['Root'][$RootTypeName]['fields'] & string]:
        RootTypeFieldMethod<{
          Config: $Config,
          Index: $Index,
          RootTypeName: $RootTypeName,
          RootTypeFieldName: $RootTypeFieldName
          Field: $Index['Root'][$RootTypeName]['fields'][$RootTypeFieldName]
        }>
    }
  )
  : TSError<'RootTypeMethods', `Your schema does not have the root type "${$RootTypeName}".`>

// dprint-ignore
export type RootMethod<$Config extends Config, $Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName> =
  <$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Root<$Index, $RootTypeName>>) =>
    Promise<
      ResolveOutputReturnRootType<$Config, $Index, ResultSet.Root<AugmentRootTypeSelectionWithTypename<$Config,$Index,$RootTypeName,$SelectionSet>, $Index, $RootTypeName>>
    >

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
  $Context['Field']['args'] extends Schema.Args<infer $Fields>  ? InputFieldsAllNullable<$Fields> extends true  ? <$SelectionSet>(args?: Exact<$SelectionSet, SelectionSet.Args<$Context['Field']['args']>>) => Promise<ReturnModeForFieldMethod<$Context, ResultSet.Field<$SelectionSet, $Context['Field'], $Context['Index']>>> :
                                                                                                                  <$SelectionSet>(args:  Exact<$SelectionSet, SelectionSet.Args<$Context['Field']['args']>>) => Promise<ReturnModeForFieldMethod<$Context, ResultSet.Field<$SelectionSet, $Context['Field'], $Context['Index']>>> :
                                                                  (() => Promise<ReturnModeForFieldMethod<$Context, ResultSet.Field<true, $Context['Field'], $Context['Index']>>>)
// dprint-ignore
type ReturnModeForFieldMethod<$Context extends RootTypeFieldContext, $Data> =
  ResolveOutputReturnRootField<$Context['Config'], $Context['Index'], $Data, { [k in $Context['RootTypeFieldName']] : $Data }>
