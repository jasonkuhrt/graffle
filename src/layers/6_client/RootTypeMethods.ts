import type { OperationTypeName } from '../../lib/graphql.js'
import type { Exact } from '../../lib/prelude.js'
import type { TSError } from '../../lib/TSError.js'
import type { InputFieldsAllNullable, Schema } from '../1_Schema/__.js'
import type { SelectionSet } from '../3_SelectionSet/__.js'
import type { ResultSet } from '../4_ResultSet/__.js'
import type {
  AugmentRootTypeSelectionWithTypename,
  Config,
  CreateSelectionTypename,
  OrThrowifyConfig,
  ReturnModeRootField,
  ReturnModeRootType,
} from './Config.js'

type RootTypeFieldContext = {
  Config: Config
  Index: Schema.Index
  RootTypeName: Schema.RootTypeName
  RootTypeFieldName: string
  Field: Schema.SomeField
}

// dprint-ignore
export type GetRootTypeMethods<$Config extends Config, $Index extends Schema.Index> = {
	[$OperationName in OperationTypeName as $Index['Root'][Capitalize<$OperationName>] extends null ? never : $OperationName]:
		RootTypeMethods<$Config, $Index, Capitalize<$OperationName>>
}

// dprint-ignore
export type RootTypeMethods<$Config extends Config, $Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName> =
  $Index['Root'][$RootTypeName] extends Schema.Object$2 ?
  (
  & {
      $batch: RootMethod<$Config, $Index, $RootTypeName>
      $batchOrThrow: RootMethod<OrThrowifyConfig<$Config>, $Index, $RootTypeName>
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
    & {
      [$RootTypeFieldName in keyof $Index['Root'][$RootTypeName]['fields'] & string as `${$RootTypeFieldName}OrThrow`]:
        RootTypeFieldMethod<{
          Config: OrThrowifyConfig<$Config>,
          Index: $Index,
          RootTypeName: $RootTypeName,
          RootTypeFieldName: $RootTypeFieldName
          Field: $Index['Root'][$RootTypeName]['fields'][$RootTypeFieldName]
        }>
    }
  )
  : TSError<'RootTypeMethods', `Your schema does not have the root type "${$RootTypeName}".`>

// dprint-ignore
type RootMethod<$Config extends Config, $Index extends Schema.Index, $RootTypeName extends Schema.RootTypeName> =
  <$SelectionSet extends object>(selectionSet: Exact<$SelectionSet, SelectionSet.Root<$Index, $RootTypeName>>) =>
    Promise<ReturnModeRootType<$Config, $Index, ResultSet.Root<AugmentRootTypeSelectionWithTypename<$Config,$Index,$RootTypeName,$SelectionSet>, $Index, $RootTypeName>>>

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

// dprint-ignore
type ObjectLikeFieldMethod<$Context extends RootTypeFieldContext> =
  <$SelectionSet>(selectionSet: Exact<$SelectionSet, SelectionSet.Field<$Context['Field'], $Context['Index'], { hideDirectives: true }>>) =>
    Promise<ReturnModeForFieldMethod<$Context, ResultSet.Field<$SelectionSet & CreateSelectionTypename<$Context['Config'],$Context['Index']>, $Context['Field'], $Context['Index']>>>

// dprint-ignore
type ScalarFieldMethod<$Context extends RootTypeFieldContext> =
  $Context['Field']['args'] extends Schema.Args<infer $Fields>  ? InputFieldsAllNullable<$Fields> extends true  ? <$SelectionSet>(args?: Exact<$SelectionSet, SelectionSet.Args<$Context['Field']['args']>>) => Promise<ReturnModeForFieldMethod<$Context, ResultSet.Field<$SelectionSet, $Context['Field'], $Context['Index']>>> :
                                                                                                                  <$SelectionSet>(args:  Exact<$SelectionSet, SelectionSet.Args<$Context['Field']['args']>>) => Promise<ReturnModeForFieldMethod<$Context, ResultSet.Field<$SelectionSet, $Context['Field'], $Context['Index']>>> :
                                                                  (() => Promise<ReturnModeForFieldMethod<$Context, ResultSet.Field<true, $Context['Field'], $Context['Index']>>>)
// dprint-ignore
type ReturnModeForFieldMethod<$Context extends RootTypeFieldContext, $Data> =
  ReturnModeRootField<$Context['Config'], $Context['Index'], $Data, { [k in $Context['RootTypeFieldName']] : $Data }>
