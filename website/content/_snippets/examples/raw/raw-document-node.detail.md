::: details Example

<div class="ExampleSnippet">
<a href="../../examples/raw/raw-document-node">Raw Document Node</a>

<!-- dprint-ignore-start -->
```ts twoslash
import { Opentelemetry, Throws } from 'graffle/extensions'
import { gql, Graffle } from 'graffle'

const graffle = Graffle.create({
  schema: `http://localhost:3000/graphql`,
})
  .use(Throws())
  .use(Opentelemetry())

const data = await graffle.raw({
  document: gql`
    query pokemonByName ($Name: String!) {
      pokemonByName (name: $Name) {
        name
        continent {
          name
        }
      }
    }
  `,
  variables: { name: `Pikachu` },
})

console.log(data)
```
<!-- dprint-ignore-end -->

<!-- dprint-ignore-start -->
```txt
/some/path/to/handleOutput.ts:60
    const error = new Errors.ContextualAggregateError(
                  ^


ContextualAggregateError: One or more errors in the execution result.
    at handleOutput (/some/path/to/handleOutput.ts:XX:XX)
    at run (/some/path/to/client.ts:XX:XX)
    at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
    at async runRaw (/some/path/to/client.ts:XX:XX)
    at async Proxy.raw (/some/path/to/client.ts:XX:XX)
    at async <anonymous> (/some/path/to/raw_rawDocumentNode__raw-document-node.ts:XX:XX) {
  context: {},
  cause: undefined,
  errors: [
    GraphQLError: Cannot query field "continent" on type "Pokemon".
        at <anonymous> (/some/path/to/graphqlHTTP.ts:XX:XX)
        at Array.map (<anonymous>)
        at parseExecutionResult (/some/path/to/graphqlHTTP.ts:XX:XX)
        at Object.unpack (/some/path/to/core.ts:XX:XX)
        at process.processTicksAndRejections (node:internal/process/task_queues:XX:XX)
        at async runHook (/some/path/to/runHook.ts:XX:XX) {
      path: undefined,
      locations: undefined,
      extensions: [Object: null prototype] {}
    }
  ]
}

Node.js vXX.XX.XX
```
<!-- dprint-ignore-end -->

</div>
:::
