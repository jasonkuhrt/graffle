<div class="ExampleSnippet">
<a href="../../examples/other/transport-memory">Transport Memory</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { Graffle } from 'graffle'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: `Query`,
    fields: {
      foo: {
        type: GraphQLString,
        resolve: () => `bar`,
      },
    },
  }),
})

const graffle = Graffle.create({ schema })

const data = await graffle.gql`
  {
    foo
  }
`.send()

console.log(data)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```json
/some/path/to/transport-memory.ts:XX:XX
const data = await graffle.gql`
                           ^


TypeError: graffle.gql is not a function
    at <anonymous> (/some/path/to/transport-memory.ts:XX:XX:28)
    at ModuleJob.run (node:internal/modules/esm/module_job:XX:XX)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:XX:XX)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:XX:XX)

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->

</div>
