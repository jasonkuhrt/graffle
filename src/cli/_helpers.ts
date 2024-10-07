import { getIntrospectionQuery, type IntrospectionQuery } from 'graphql'
import { Graffle } from '../entrypoints/__Graffle.js'
import type { TypedDocument } from '../lib/typed-document/__.js'

// todo make an introspection query extension.
export const introspectionQuery = async (endpoint: URL): Promise<IntrospectionQuery> => {
  const introspectionQueryDocument = getIntrospectionQuery({
    descriptions: true,
    schemaDescription: true,
    directiveIsRepeatable: true,
    specifiedByUrl: true,
    inputValueDeprecation: true,
  }) as TypedDocument.String<IntrospectionQuery>

  const data = await Graffle.create({ schema: endpoint }).gql(introspectionQueryDocument).send()

  if (!data) {
    throw new Error(`No data returned for introspection query.`)
  }

  return data
}
