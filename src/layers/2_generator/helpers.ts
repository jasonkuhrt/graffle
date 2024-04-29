import type { Config } from './generateCode.js'

export const title = (title: string) => {
  const titleDecorated = `// ${title}\n// ${`-`.repeat(title.length)}\n`
  return titleDecorated
}
export const typeTitle = (config: Config, typeName: string) => {
  // @ts-expect-error ignoreme
  // eslint-disable-next-line
  const hasItems = config.typeMapByKind[`GraphQL${typeName}Type`]?.length > 0
  const title = `${typeName} Types`
  const titleDecorated = `// ${title}\n// ${`-`.repeat(title.length)}\n`
  if (hasItems) {
    return titleDecorated
  } else {
    return `${titleDecorated}\n// -- None --\n`
  }
}
