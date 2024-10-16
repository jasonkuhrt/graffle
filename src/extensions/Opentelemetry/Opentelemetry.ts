import { trace, type Tracer } from '@opentelemetry/api'
import { createExtension } from '../../layers/6_client/extension/extension.js'
import { createConfig, type Input } from './config.js'

export const Opentelemetry = (input?: Input) => {
  const config = createConfig(input)
  const tracer = trace.getTracer(config.tracerName)
  const startActiveGraffleSpan = startActiveSpan(tracer)

  return createExtension({
    name: `Opentelemetry`,
    onRequest: async ({ encode }) => {
      encode.input
      return await startActiveGraffleSpan(`request`, async () => {
        const { pack } = await startActiveGraffleSpan(`encode`, encode)
        const { exchange } = await startActiveGraffleSpan(`pack`, pack)
        const { unpack } = await startActiveGraffleSpan(`exchange`, exchange)
        const { decode } = await startActiveGraffleSpan(`unpack`, unpack)
        const result = await startActiveGraffleSpan(`decode`, decode)
        return result
      })
    },
  })
}

const startActiveSpan = (tracer: Tracer) => <Result>(name: string, fn: () => Promise<Result>): Promise<Result> => {
  return tracer.startActiveSpan(name, async (span) => {
    const result = await fn()
    span.end()
    return result
  })
}
