export type Input = {
  /**
   * @defaultValue `"opentelemetry"`
   */
  tracerName?: string
}

export type Config = {
  tracerName: string
}

export const defaults = {
  tracerName: `graffle`,
} satisfies Config

export const createConfig = (input?: Input): Config => {
  return {
    tracerName: input?.tracerName ?? defaults.tracerName,
  }
}
