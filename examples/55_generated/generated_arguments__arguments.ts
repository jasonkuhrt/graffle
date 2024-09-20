import { bench } from '@ark/attest'
import { Atlas } from '../$/generated-clients/atlas/__.js'

bench.baseline(() => null)

bench(`query.countries`, async () => {
  const atlas = Atlas.create()
  await atlas.query.countries({
    $: { filter: { name: { in: [`Canada`, `Germany`, `Japan`] } } },
    name: true,
    continent: { name: true },
  })
}).types([1, `instantiations`])

// import { Graffle } from '../../tests/_/schema/generated/__.js'

// const graffle = Graffle.create()

// await graffle.query.countries({
//   $: { filter: { name: { in: [`Canada`, `Germany`, `Japan`] } } },
//   name: true,
//   continent: { name: true },
// })
