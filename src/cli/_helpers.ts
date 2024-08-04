import { type ExecutionResult, getIntrospectionQuery, type IntrospectionQuery } from 'graphql'
import { Graffle } from '../entrypoints/alpha/__Graffle.js'

export const introspectionQuery = async (endpoint: URL): Promise<IntrospectionQuery> => {
  const fullIntrospectionQuery = getIntrospectionQuery({
    descriptions: true,
    schemaDescription: true,
    directiveIsRepeatable: true,
    specifiedByUrl: true,
    inputValueDeprecation: true,
  })
  const result = (await Graffle.create({ schema: endpoint }).rawOrThrow(fullIntrospectionQuery)) as ExecutionResult<
    IntrospectionQuery
  > // todo use http execution result
  return result.data!
}
