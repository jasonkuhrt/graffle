import type { TypedQueryDocumentNode } from 'graphql'
import { parse } from 'graphql'

/**
 * Returns the string with any variables given interpolated and then parsed into a DocumentNode.
 *
 * @example
 * ```
 * import { gql } from 'graffle'
 *
 * await request('https://foo.bar/graphql', gql`...`)
 * ```
 *
 * @remarks
 *
 * Several tools in the Node GraphQL ecosystem are hardcoded to specially treat any template tag named "gql". For example see this prettier issue: https://github.com/prettier/prettier/issues/4360. Using this template tag has no runtime effect beyond variable interpolation.
 */
export const gql = <$Data, $Variables>(
  chunks: TemplateStringsArray,
  ...variables: unknown[]
): TypedQueryDocumentNode<$Data, $Variables> => {
  const string = chunks.reduce(
    (acc, chunk, index) => `${acc}${chunk}${index in variables ? String(variables[index]) : ``}`,
    ``,
  )
  return parse(string) as any
}
