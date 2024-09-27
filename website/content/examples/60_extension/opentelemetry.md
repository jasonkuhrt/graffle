---
aside: false
---

# Opentelemetry

<!-- dprint-ignore-start -->
```ts twoslash
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { Opentelemetry } from 'graffle/extensions'
import { Pokemon } from './Pokemon/__.js'

// Setup Opentelemetry
// 1. Initialize the OpenTelemetry provider
// 2. Register the provider to make the OpenTelemetry API use it
const exporter = new ConsoleSpanExporter()
const processor = new SimpleSpanProcessor(exporter)
const provider = new NodeTracerProvider()
provider.addSpanProcessor(processor)
provider.register()

const graffle = Pokemon.create().use(Opentelemetry())
const data = await graffle.rawString({ document: `query { pokemons { name } }` })
console.log(data)
```
<!-- dprint-ignore-end -->

#### Outputs

<!-- dprint-ignore-start -->
```txt
{
  resource: {
    attributes: {
      'service.name': 'unknown_service:/Users/jasonkuhrt/Library/pnpm/nodejs/22.7.0/bin/node',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.26.0'
    }
  },
  instrumentationScope: { name: 'graffle', version: undefined, schemaUrl: undefined },
  traceId: '2425e1fa8ec1ef82bf9ecc2a3e56b61e',
  parentId: 'b2f904776bcaa002',
  traceState: undefined,
  name: 'encode',
  id: '78acc1f2e8fb595c',
  kind: 0,
  timestamp: 1727446619397000,
  duration: 580.959,
  attributes: {},
  status: { code: 0 },
  events: [],
  links: []
}
```
<!-- dprint-ignore-end -->
<!-- dprint-ignore-start -->
```txt
{
  resource: {
    attributes: {
      'service.name': 'unknown_service:/Users/jasonkuhrt/Library/pnpm/nodejs/22.7.0/bin/node',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.26.0'
    }
  },
  instrumentationScope: { name: 'graffle', version: undefined, schemaUrl: undefined },
  traceId: '2425e1fa8ec1ef82bf9ecc2a3e56b61e',
  parentId: 'b2f904776bcaa002',
  traceState: undefined,
  name: 'pack',
  id: 'c68aa2ad85e63957',
  kind: 0,
  timestamp: 1727446619399000,
  duration: 11467.084,
  attributes: {},
  status: { code: 0 },
  events: [],
  links: []
}
```
<!-- dprint-ignore-end -->
<!-- dprint-ignore-start -->
```txt
{
  resource: {
    attributes: {
      'service.name': 'unknown_service:/Users/jasonkuhrt/Library/pnpm/nodejs/22.7.0/bin/node',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.26.0'
    }
  },
  instrumentationScope: { name: 'graffle', version: undefined, schemaUrl: undefined },
  traceId: '2425e1fa8ec1ef82bf9ecc2a3e56b61e',
  parentId: 'b2f904776bcaa002',
  traceState: undefined,
  name: 'exchange',
  id: '884a41968d8a5500',
  kind: 0,
  timestamp: 1727446619411000,
  duration: 21330.917,
  attributes: {},
  status: { code: 0 },
  events: [],
  links: []
}
```
<!-- dprint-ignore-end -->
<!-- dprint-ignore-start -->
```txt
{
  resource: {
    attributes: {
      'service.name': 'unknown_service:/Users/jasonkuhrt/Library/pnpm/nodejs/22.7.0/bin/node',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.26.0'
    }
  },
  instrumentationScope: { name: 'graffle', version: undefined, schemaUrl: undefined },
  traceId: '2425e1fa8ec1ef82bf9ecc2a3e56b61e',
  parentId: 'b2f904776bcaa002',
  traceState: undefined,
  name: 'unpack',
  id: 'b50cd96152566cd5',
  kind: 0,
  timestamp: 1727446619433000,
  duration: 1154.291,
  attributes: {},
  status: { code: 0 },
  events: [],
  links: []
}
```
<!-- dprint-ignore-end -->
<!-- dprint-ignore-start -->
```txt
{
  resource: {
    attributes: {
      'service.name': 'unknown_service:/Users/jasonkuhrt/Library/pnpm/nodejs/22.7.0/bin/node',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.26.0'
    }
  },
  instrumentationScope: { name: 'graffle', version: undefined, schemaUrl: undefined },
  traceId: '2425e1fa8ec1ef82bf9ecc2a3e56b61e',
  parentId: 'b2f904776bcaa002',
  traceState: undefined,
  name: 'decode',
  id: '627fbb0af5d9cd8b',
  kind: 0,
  timestamp: 1727446619434000,
  duration: 191.833,
  attributes: {},
  status: { code: 0 },
  events: [],
  links: []
}
```
<!-- dprint-ignore-end -->
<!-- dprint-ignore-start -->
```txt
{
  resource: {
    attributes: {
      'service.name': 'unknown_service:/Users/jasonkuhrt/Library/pnpm/nodejs/22.7.0/bin/node',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.26.0'
    }
  },
  instrumentationScope: { name: 'graffle', version: undefined, schemaUrl: undefined },
  traceId: '2425e1fa8ec1ef82bf9ecc2a3e56b61e',
  parentId: undefined,
  traceState: undefined,
  name: 'request',
  id: 'b2f904776bcaa002',
  kind: 0,
  timestamp: 1727446619396000,
  duration: 38274.375,
  attributes: {},
  status: { code: 0 },
  events: [],
  links: []
}
```
<!-- dprint-ignore-end -->
<!-- dprint-ignore-start -->
```txt
{
  pokemons: [
    { name: 'Pikachu' },
    { name: 'Charizard' },
    { name: 'Squirtle' },
    { name: 'Bulbasaur' }
  ]
}
```
<!-- dprint-ignore-end -->
