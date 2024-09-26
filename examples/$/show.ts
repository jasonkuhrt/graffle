import { inspect } from 'node:util'

const originalWrite = globalThis.process.stdout.write.bind(globalThis.process.stdout)

type Logger = typeof console.log | typeof globalThis.process.stdout.write

export const show = <$Logger extends Logger = typeof console.log>(
  value: unknown,
  subTitle?: string,
): ReturnType<$Logger> => {
  const write = console.log
  const inspected = typeof value === 'string' ? value : inspect(value, { depth: null, colors: true })
  const message = renderShow(inspected, subTitle)
  return write(message) as ReturnType<$Logger>
}

export const showJson = <$Logger extends Logger = typeof console.log>(
  value: unknown,
): ReturnType<$Logger> => {
  const write = console.log
  const encoded = JSON.stringify(value, null, 2)
  const message = renderShow(encoded)
  return write(message) as ReturnType<$Logger>
}

export const showPartition = `---------------------------------------- SHOW ----------------------------------------`

const renderShow = (value: string, subTitle?: string) => {
  return showPartition + (subTitle ? `\n${subTitle}` : '') + '\n' + value
}

export const interceptAndShowOutput = (): void => {
  globalThis.process.stdout.write = (value) => {
    if (typeof value !== `string`) return originalWrite(value)
    if (value.includes(showPartition)) return originalWrite(value)
    return originalWrite(renderShow(value))
  }
}

export const interceptAndShowUncaughtErrors = () => {
  process.on('uncaughtException', (error) => {
    show(error, 'UNCAUGHT EXCEPTION:\n')
    process.exit(1)
  })
}
