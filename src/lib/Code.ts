export namespace Code {
  export const quote = (str: string) => `"${str}"`
  export const nullable = (type: string) => `${type} | null`
  export const union = (name: string, types: string[]) => `type ${name} =\n| ${Code.unionItems(types)}`
  export const unionItems = (types: string[]) => types.join(`\n| `)
  export const list = (type: string) => `Array<${type}>`
  export const fieldType = (name: string, type: string) => `"${name}": ${type}`
  export const fieldTypes = (fieldTypes: string[]) => fieldTypes.join(`\n`)
  export const inter = (name: string, fields: string) => `interface ${name} {\n${fields}\n}`
  export const commentSectionTitle = (title: string) => {
    const lineSize = 60
    const line = `-`.repeat(lineSize)
    const titlePrefixSpace = ` `.repeat(Math.round(lineSize / 2) - Math.round(title.length / 2))
    const titleSuffixSpace = ` `.repeat(lineSize - (titlePrefixSpace.length + title.length))
    return `\n\n// ${line} //\n// ${titlePrefixSpace + title + titleSuffixSpace} //\n// ${line} //\n\n`
  }
}
