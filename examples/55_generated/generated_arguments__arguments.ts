import { bench } from '@ark/attest'
import { Atlas } from '../$/generated-clients/atlas/__.js'

bench.baseline(() => null)

bench(`query.countries`, async () => {
  const atlas = Atlas.create()
  const x = await atlas.query.continent({ name: true })
  // await atlas.query.countries({
  //   name: true,
  //   // $: { filter: { name: { in: [`Canada`, `Germany`, `Japan`] } } },
  //   // continent: { name: true },
  // })
}).types([1, `instantiations`])
