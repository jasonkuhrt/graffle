export interface DirectiveLike {
  name: string
  args: Record<string, any>
}

export const toGraphQLDirective = (directive: DirectiveLike) => {
  return `@${directive.name}(${toGraphQLDirectiveArgs(directive.args)})`
}

export const toGraphQLDirectiveArgs = (args: object) => {
  return Object.entries(args).filter(([_, v]) => v !== undefined).map(([k, v]) => {
    // todo can directives receive custom scalars?
    return `${k}: ${JSON.stringify(v)}`
  }).join(`, `)
}
