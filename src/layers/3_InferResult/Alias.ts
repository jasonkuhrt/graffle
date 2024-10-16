import type { mergeObjectArray, ValuesOrEmptyObject } from '../../lib/prelude.js'
import type { SchemaKit } from '../1_Schema/__.js'
import type { Select } from '../2_Select/__.js'
import type { Schema } from '../4_generator/generators/Schema.js'
import type { Field } from './Field.js'

// dprint-ignore
export type Alias<
	$SelectionSet,
	$Schema extends Schema,
	$Node extends SchemaKit.Output.Object$2
> =
  ValuesOrEmptyObject<
    {
      [
        $Select in keyof $SelectionSet as $SelectionSet[$Select] extends Select.SelectAlias.SelectAlias
					? $Select
					: never
      ]:
        InferSelectAlias<
          // @ts-expect-error We know this satisfies the alias type constraint b/c of the key filtering above.
          $SelectionSet[$Select],
          $Select,
          $Schema,
          $Node
        >
    }
  >

// dprint-ignore
type InferSelectAlias<
  $SelectAlias extends Select.SelectAlias.SelectAlias,
  $FieldName extends string,
  $Schema extends Schema,
  $Node extends SchemaKit.Output.Object$2,
> =
  $SelectAlias extends Select.SelectAlias.SelectAliasOne      ? InferSelectAliasOne<$SelectAlias, $FieldName, $Schema, $Node> :
  $SelectAlias extends Select.SelectAlias.SelectAliasMultiple ? InferSelectAliasMultiple<$SelectAlias, $FieldName, $Schema, $Node> :
                                                                never

type InferSelectAliasMultiple<
  $SelectAliasMultiple extends Select.SelectAlias.SelectAliasMultiple,
  $FieldName extends string,
  $Schema extends Schema,
  $Node extends SchemaKit.Output.Object$2,
> = mergeObjectArray<
  {
    [_ in keyof $SelectAliasMultiple]: InferSelectAliasOne<$SelectAliasMultiple[_], $FieldName, $Schema, $Node>
  }
>

type InferSelectAliasOne<
  $SelectAliasOne extends Select.SelectAlias.SelectAliasOne,
  $FieldName extends string,
  $Schema extends Schema,
  $Node extends SchemaKit.Output.Object$2,
> = {
  [_ in $SelectAliasOne[0]]: Field<$SelectAliasOne[1], $Node['fields'][$FieldName], $Schema>
}
