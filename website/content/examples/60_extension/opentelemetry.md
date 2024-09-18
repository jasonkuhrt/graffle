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
  traceId: '9052b021c626370eabb7d7fb4f575045',
  parentId: '51abe3edd132250a',
  traceState: undefined,
  name: 'encode',
  id: '7c13553177946289',
  kind: 0,
  timestamp: 1726679255958000,
  duration: 522.417,
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
  traceId: '9052b021c626370eabb7d7fb4f575045',
  parentId: '51abe3edd132250a',
  traceState: undefined,
  name: 'pack',
  id: '8133f915673ed123',
  kind: 0,
  timestamp: 1726679255960000,
  duration: 956.25,
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
  traceId: '9052b021c626370eabb7d7fb4f575045',
  parentId: '51abe3edd132250a',
  traceState: undefined,
  name: 'exchange',
  id: '1812f1fcab09c9a8',
  kind: 0,
  timestamp: 1726679255962000,
  duration: 155840.833,
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
  traceId: '9052b021c626370eabb7d7fb4f575045',
  parentId: '51abe3edd132250a',
  traceState: undefined,
  name: 'unpack',
  id: 'a9f7183565f62ece',
  kind: 0,
  timestamp: 1726679256118000,
  duration: 2281.208,
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
  traceId: '9052b021c626370eabb7d7fb4f575045',
  parentId: '51abe3edd132250a',
  traceState: undefined,
  name: 'decode',
  id: 'f2546a7c36cb5142',
  kind: 0,
  timestamp: 1726679256120000,
  duration: 123.042,
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
  traceId: '9052b021c626370eabb7d7fb4f575045',
  parentId: undefined,
  traceState: undefined,
  name: 'request',
  id: '51abe3edd132250a',
  kind: 0,
  timestamp: 1726679255958000,
  duration: 163055.167,
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
