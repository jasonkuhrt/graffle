import { expect, test } from 'vitest'
import { db } from '../../../tests/_/schemas/db.js'
import { $index } from '../../../tests/_/schemas/kitchen-sink/graffle/modules/RuntimeCustomScalars.js'
import type * as SelectionSets from '../../../tests/_/schemas/kitchen-sink/graffle/modules/SelectionSets.js'
import { Grafaid } from '../../lib/grafaid/__.js'
import { Select } from '../2_Select/__.js'
import { toGraphQL } from './toGraphQL.js'

type CasesDescriptiveQuery = [description: string, selectionSet: SelectionSets.Query]
const testEachQueryWithDescription = test.for.bind(test)<CasesDescriptiveQuery>

const tester = (input: { extractOperationVariables: boolean }) =>
  [
    `( extractOperationVariables: ${String(input.extractOperationVariables)} ) - Query - %s`,
    (args: CasesDescriptiveQuery) => {
      const [description, graffleQuery] = args

      const { document, operationsVariables } = toGraphQL({
        document: Select.Document.createDocumentNormalizedFromQuerySelection(graffleQuery as any),
        options: {
          sddm: $index,
          extractOperationVariables: input.extractOperationVariables,
        },
      })

      const beforeAndAfter = `\n`
        + `\n--------------GRAFFLE QUERY-------------\n`
        + JSON.stringify(graffleQuery, null, 2)
        + `\n--------GRAPHQL DOCUMENT & VARIABLES--------\n`
        + Grafaid.Nodes.print(document)
        + `\n----------------\n`
        + JSON.stringify(operationsVariables, null, 2)
        + `\n`

      expect(beforeAndAfter).toMatchSnapshot(description)
    },
  ] as const

// dprint-ignore
const cases = testEachQueryWithDescription([
  [`fg - one`             , { ___: { __typename: true } }],
  [`fg - multiple`        , { ___: [{ __typename: true }, { abcEnum: true }] }],
  [`fg - interface`       , { interface: { ___: { __typename: true } } }],
  [`fg - in union`        , { unionFooBar: { ___: { __typename: true } } }],
  [`fg - directive`       , { ___: { __typename: true, $include: true } }],
  // union
  [`union - __typename (no fragment)`  , { unionFooBar: { __typename: true } }],
  [`union - scalar`                    , { unionFooBar: { ___on_Bar: { int: true } } }],
  [`union - directive`                 , { unionFooBar: { ___on_Bar: { $skip: true, int: true } } }],
  // s({ unionFooBar: { __on_Bar: {} } }), // todo should be static type error
  // alias
  [`alias - scalar`                    , { id: [`x`, true] }],
  [`alias - scalar x2`                 , { id: [[`x`, true], [`id2`, true]] }],
  [`alias - scalar directive`          , { id: [`x`, { $skip: true }] }],
  [`alias - scalar directive+select`   , { object: [`x`, { $skip: true, id: true }] }],
    // arguments
  [`args - on union`                             , { result: { $: { $case: `Object1` }, __typename: true } }],
  [`args - string with args`                     , { stringWithArgs: { $: { boolean: true, float: 1 } } }],
  [`args - string with args (empty object)`      , { stringWithArgs: { $: {} } }],
  // arguments custom scalars
  [`args - custom scalar - arg field`                                , { dateArg: { $: { date: db.date0 } } }],
  [`args - custom scalar - arg field in non-null`                    , { dateArgNonNull: { $: { date: db.date0 } } }], 
  [`args - custom scalar - arg field in list`                        , { dateArgList: { $: { date: [db.date0, new Date(1)] } } }], 
  [`args - custom scalar - arg field in list (null)`                 , { dateArgList: { $: { date: null } } }],
  [`args - custom scalar - arg field in non-null list (with list)`   , { dateArgNonNullList: { $: { date: [db.date0, new Date(1)] } } }],
  [`args - custom scalar - arg field in non-null list (with null)`   , { dateArgNonNullList: { $: { date: [null, db.date0] } } }],
  [`args - custom scalar - arg field in non-null list non-null`      , { dateArgNonNullListNonNull: { $: { date: [db.date0, new Date(1)] } } }],
  [`args - custom scalar - input object field`                       , { dateArgInputObject: { $: { input: { idRequired: ``, dateRequired: db.date0, date: new Date(1) } } } }],
  [`args - custom scalar - nested input object field`                , { InputObjectNested: { $: { input: { InputObject: { idRequired: ``, dateRequired: db.date0, date: new Date(1) } } } } }],
  // s({ objectWithArgs: { $: { id: `` } } }), // todo should be static error
  // s({ objectWithArgs: { $: {} } }), // todo should be static error
  [`args - object with args`, { objectWithArgs: { $: { id: `` }, id: true } }],
  [`args - object with args (empty object)`      , { objectWithArgs: { $: {}, id: true } }],
  // $include
  [`$include`                             , { object: { $include: true, id: true } }],
  [`$include (false)`                     , { object: { $include: false, id: true } }],
  [`$include (undefined)`                 , { object: { $include: undefined, id: true } }],
  [`$include (if true)`                   , { object: { $include: { if: true }, id: true } }],
  [`$include (if false)`                  , { object: { $include: { if: false }, id: true } }],
  [`$include (if undefined)`              , { object: { $include: { if: undefined }, id: true } }],
  [`$include (empty object)`              , { object: { $include: {}, id: true } }],
  // skip
  [`$skip (true)`                         , { object: { $skip: true, id: true } }],
  [`$skip (false)`                        , { object: { $skip: false, id: true } }],
  [`$skip (undefined)`                    , { object: { $skip: undefined, id: true } }],
  [`$skip (if true)`                      , { object: { $skip: { if: true }, id: true } }],
  [`$skip (if false)`                     , { object: { $skip: { if: false }, id: true } }],
  [`$skip (if undefined)`                 , { object: { $skip: { if: undefined }, id: true } }],
  [`$skip (empty object)`                 , { object: { $skip: {}, id: true } }],
  [`object nested scalar $skip`           , { objectNested: { object: { string: true, id: true, int: { $skip: true } } } }],
  // other
  [`other`                                , { __typename: true }],
  [`string`                               , { string: true }],
  // [{ string: 1 }],
  // s({ string: false }), // todo should be static error
  [`id string false`                      , { id: true, string: false }],
  // [{ id: true, string: 0 }],
  [`id string undefined`                  , { id: true, string: undefined }],
  [`object scalar`                        , { object: { id: true } }],
  [`object nested`                        , { objectNested: { object: { string: true, id: true, int: false } } }],
])
cases(...tester({ extractOperationVariables: true }))
cases(...tester({ extractOperationVariables: false }))
