import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { Opentelemetry } from '../src/entrypoints/extensions.js'
import { Atlas } from './$/generated-clients/atlas/__.js'
import { interceptAndShowOutput, show } from './$/helpers.js'

interceptAndShowOutput()

// Setup Opentelemetry
// 1. Initialize the OpenTelemetry provider
// 2. Register the provider to make the OpenTelemetry API use it
const exporter = new ConsoleSpanExporter()
const processor = new SimpleSpanProcessor(exporter)
const provider = new NodeTracerProvider()
provider.addSpanProcessor(processor)
provider.register()

const graffle = Atlas.create().use(Opentelemetry())
const result = await graffle.rawString({ document: `query { continents { name } }` })
show(result.data)
