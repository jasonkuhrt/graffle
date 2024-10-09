// import { describe, test } from 'vitest'
// import { db } from '../../../../tests/_/schemas/db.js'

// // dprint-ignore
// describe(`custom scalars`, () => {
//     test.each<CasesDescriptiveQuery>([
//       [`arg field`, { dateArg: { $: { date: db.date0 } } }],
//       [`arg field in non-null`, { dateArgNonNull: { $: { date: db.date0 } } }],
//       [`arg field in list`, { dateArgList: { $: { date: [db.date0, new Date(1)] } } }],
//       [`arg field in list (null)`, { dateArgList: { $: { date: null } } }],
//       [`arg field in non-null list (with list)`, { dateArgNonNullList: { $: { date: [db.date0, new Date(1)] } } }],
//       [`arg field in non-null list (with null)`, { dateArgNonNullList: { $: { date: [null, db.date0] } } }],
//       [`arg field in non-null list non-null`, { dateArgNonNullListNonNull: { $: { date: [db.date0, new Date(1)] } } }],
//       [`input object field`, { dateArgInputObject: { $: { input: { idRequired: ``, dateRequired: db.date0, date: new Date(1) } } } }],
//       [`nested input object field`, { InputObjectNested: { $: { input: { InputObject: { idRequired: ``, dateRequired: db.date0, date: new Date(1) } } } } }]
//     ])(...testEachArguments)
//   })
