import { inspect } from 'node:util'

const originalWrite = globalThis.process.stdout.write.bind(globalThis.process.stdout)

type Logger = typeof console.log | typeof globalThis.process.stdout.write

export const show = <$Logger extends Logger = typeof console.log>(
  value: unknown,
  logger?: $Logger,
): ReturnType<$Logger> => {
  const write = logger ?? console.log
  const inspected = inspect(value, { depth: null, colors: true })
  const message = renderShow(inspected)
  return write(message) as ReturnType<$Logger>
}

export const showJson = <$Logger extends Logger = typeof console.log>(
  value: unknown,
  logger?: $Logger,
): ReturnType<$Logger> => {
  const write = logger ?? console.log
  const encoded = JSON.stringify(value, null, 2)
  const message = renderShow(encoded)
  return write(message) as ReturnType<$Logger>
}

export const showPartition = `---------------------------------------- SHOW ----------------------------------------`

const renderShow = (value: string) => {
  return showPartition + '\n' + value
}

export const interceptAndShowOutput = (): void => {
  globalThis.process.stdout.write = (value) => {
    if (typeof value !== `string`) return originalWrite(value)
    if (value.includes(showPartition)) return originalWrite(value)
    return originalWrite(renderShow(value))
  }
}
