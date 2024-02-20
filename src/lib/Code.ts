export namespace Code {
  export const propertyAccess = (object: string, name: string) => `${object}.${name}`
  export const quote = (str: string) => `"${str}"`
  export const nullable = (type: string) => `${type} | null`
  export const union = (name: string, types: string[]) => `type ${name} =\n| ${Code.unionItems(types)}`
  export const unionItems = (types: string[]) => types.join(`\n| `)
  export const list = (type: string) => `Array<${type}>`
  export const field = (name: string, type: string, options?: { optional?: boolean }) => {
    if (options?.optional) return `${name}?: ${type}`
    return `${name}: ${type}`
  }
  export const optionalField = (name: string, type: string) => Code.field(name, type, { optional: true })
  export const fields = (fieldTypes: string[]) => fieldTypes.join(`\n`)
  export const intersection = (a: string, b: string) => `${a} & ${b}`
  export const object = (fields: string) => `{\n${fields}\n}`
  export const interface$ = (name: string, fields: string) => `interface ${name} ${Code.object(fields)}`
  export const export$ = (thing: string) => `export ${thing}`
  export const TSDoc = (content: string | null, block: string) =>
    content === null ? block : `/**\n${prependLines(`* `, content) || `*`}\n*/\n${block}`
  export const namespace = (name: string, content: string) => `namespace ${name} ${Code.object(content)}`
  export const group = (...content: string[]) => content.join(`\n`)
  export const commentSectionTitle = (title: string) => {
    const lineSize = 60
    const line = `-`.repeat(lineSize)
    const titlePrefixSpace = ` `.repeat(Math.round(lineSize / 2) - Math.round(title.length / 2))
    const titleSuffixSpace = ` `.repeat(lineSize - (titlePrefixSpace.length + title.length))
    return `\n\n// ${line} //\n// ${titlePrefixSpace + title + titleSuffixSpace} //\n// ${line} //\n\n`
  }
}

const prependLines = (prepend: string, str: string) => str.split(`\n`).map((line) => `${prepend}${line}`).join(`\n`)
