---
aside: false
---

# Opentelemetry

<!-- dprint-ignore-start -->
```ts twoslash
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { Opentelemetry } from 'graffle/extensions'
import { Graffle as Atlas } from './graffle/__.js'

// Setup Opentelemetry
// 1. Initialize the OpenTelemetry provider
// 2. Register the provider to make the OpenTelemetry API use it
const exporter = new ConsoleSpanExporter()
const processor = new SimpleSpanProcessor(exporter)
const provider = new NodeTracerProvider()
provider.addSpanProcessor(processor)
provider.register()

const graffle = Atlas.create().use(Opentelemetry())
const data = await graffle.rawString({ document: `query { continents { name } }` })
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
  traceId: '9f4dcc1213a3f3d4605da3d9c3340361',
  parentId: 'f0c18d7e669cfd3d',
  traceState: undefined,
  name: 'encode',
  id: 'e06d4e860f48bc58',
  kind: 0,
  timestamp: 1726541103051000,
  duration: 552.125,
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
  traceId: '9f4dcc1213a3f3d4605da3d9c3340361',
  parentId: 'f0c18d7e669cfd3d',
  traceState: undefined,
  name: 'pack',
  id: 'a29e1e9baaa80c0e',
  kind: 0,
  timestamp: 1726541103053000,
  duration: 1086.75,
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
  traceId: '9f4dcc1213a3f3d4605da3d9c3340361',
  parentId: 'f0c18d7e669cfd3d',
  traceState: undefined,
  name: 'exchange',
  id: 'f2a21df585a2fdbb',
  kind: 0,
  timestamp: 1726541103055000,
  duration: 177279.959,
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
  traceId: '9f4dcc1213a3f3d4605da3d9c3340361',
  parentId: 'f0c18d7e669cfd3d',
  traceState: undefined,
  name: 'unpack',
  id: '2088b4af9a15807e',
  kind: 0,
  timestamp: 1726541103233000,
  duration: 2944,
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
  traceId: '9f4dcc1213a3f3d4605da3d9c3340361',
  parentId: 'f0c18d7e669cfd3d',
  traceState: undefined,
  name: 'decode',
  id: '11a1c3568453721f',
  kind: 0,
  timestamp: 1726541103236000,
  duration: 127.375,
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
  traceId: '9f4dcc1213a3f3d4605da3d9c3340361',
  parentId: undefined,
  traceState: undefined,
  name: 'request',
  id: 'f0c18d7e669cfd3d',
  kind: 0,
  timestamp: 1726541103050000,
  duration: 186111.542,
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
  continents: [
    { name: 'Africa' },
    { name: 'Antarctica' },
    { name: 'Asia' },
    { name: 'Europe' },
    { name: 'North America' },
    { name: 'Oceania' },
    { name: 'South America' }
  ]
}
```
<!-- dprint-ignore-end -->
