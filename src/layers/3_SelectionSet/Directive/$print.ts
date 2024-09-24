import type { DirectiveLike } from './$types.js'

export const toGraphQLDirective = (directive: DirectiveLike) => {
  return `@${directive.name}(${toGraphQLDirectiveArgs(directive.args)})`
}

export const toGraphQLDirectiveArgs = (args: DirectiveLike['args']) => {
  return Object.entries(args).filter(([_, v]) => v !== undefined).map(([k, clientValue]) => {
    // todo can directives receive custom scalars?
    const value = JSON.stringify(clientValue)
    return `${k}: ${value}`
  }).join(`, `)
}
