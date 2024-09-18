import { type GraphQLEnumValue, isEnumType } from 'graphql'
import { type Describable, getNodeDisplayName, isDeprecatableNode } from '../../lib/graphql.js'
import type { Config } from './generateCode.js'

export const title = (title: string) => {
  const titleDecorated = `// ${title}\n// ${`-`.repeat(title.length)}\n`
  return titleDecorated
}
export const typeTitle = (config: Config, typeName: string) => {
  // @ts-expect-error ignoreme

  const hasItems = config.typeMapByKind[`GraphQL${typeName}Type`]?.length > 0
  const title = `${typeName} Types`
  const titleDecorated = `// ${title}\n// ${`-`.repeat(title.length)}\n`
  if (hasItems) {
    return titleDecorated
  } else {
    return `${titleDecorated}\n// -- None --\n`
  }
}

const defaultDescription = (node: Describable) => `There is no documentation for this ${getNodeDisplayName(node)}.`

export const getDocumentation = (config: Config, node: Describable) => {
  const generalDescription = node.description
    ?? (config.options.TSDoc.noDocPolicy === `message` ? defaultDescription(node) : null)

  const deprecationDescription = isDeprecatableNode(node) && node.deprecationReason
    ? `@deprecated ${node.deprecationReason}`
    : null

  const enumMemberDescriptions: string[] = isEnumType(node)
    ? node
      .getValues()
      .map((_) => {
        const deprecationDescription = _.deprecationReason
          ? `(DEPRECATED: ${_.deprecationReason})`
          : null
        const generalDescription = _.description
          ? _.description
          : config.options.TSDoc.noDocPolicy === `message`
          ? `Missing description.`
          : null
        if (!generalDescription && !deprecationDescription) return null
        const content = [generalDescription, deprecationDescription]
          .filter((_) => _ !== null)
          .join(` `)
        return [_, content] as const
      })
      .filter((_): _ is [GraphQLEnumValue, string] => _ !== null)
      .map(([node, description]) => {
        const content = `"${node.name}" - ${description}`
        return content
      })
    : []
  const enumMemberDescription = enumMemberDescriptions.length > 0
    ? `Members\n${enumMemberDescriptions.join(`\n`)}`
    : null
  if (!enumMemberDescription && !generalDescription && !deprecationDescription) {
    return null
  }
  const content = [
    generalDescription,
    enumMemberDescription,
    deprecationDescription,
  ]
    .filter((_) => _ !== null)
    .join(`\n\n`)
  return content
}
