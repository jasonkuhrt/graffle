import { getIntrospectionQuery, type IntrospectionQuery } from 'graphql'
import type { Extension } from '../../../entrypoints/main.js'
import type { Fluent } from '../../../lib/fluent/__.js'
import { createExtension } from '../../6_client/extension/extension.js'
import type { FnParametersProperty } from '../../6_client/fluent.js'
import type { ResolveOutputGql } from '../../6_client/handleOutput.js'
import { createConfig, type Input } from './config.js'

/**
 * This extension adds a `.introspect` method to the client that will return the introspected schema.
 *
 * @example
 *
 * ```ts
 * import { Introspection } from 'graffle/extensions'
 *
 * const graffle = new Graffle({
 *   schema: 'http://localhost:3000/graphql',
 * })
 * .use(Introspection())
 *
 * const data = await graffle.introspect()
 * ```
 */
export const Introspection = (input?: Input) => {
  const config = createConfig(input)

  return createExtension<IntrospectionExtension>({
    name: `Introspection`,
    onBuilderGet: ({ path, property, client }) => {
      if (!(path.length === 0 && property === `introspect`)) return

      return async () => {
        const introspectionQueryDocument = getIntrospectionQuery(config.options)

        // todo use config schema override.
        // This will require being able to change the configured schema.
        // If moving between transports (e.g. endpoint / instance) then it could break anyware
        // that assumes a certain transport is being used.
        // Solutions:
        // 1. Don't narrow hook types of inline anyware. Safe. Harder to write anyware for all cases.
        // 2. Somehow make this extensions input inherit the transport constraint of the instance it is being used on.
        //    Meaning the input would not allow any schema source but only those compatible with the transport.
        //    Note: This would still require some kind of unsafe internal way to change the already set schema.
        //    Maybe make it safe using with wherein with allows changing as described above _within the transport constraint_.
        // 3. Don't make this safe. Rely on users not hitting case of mixing transports + having an anyware not expecting it.
        return await client.gql(introspectionQueryDocument).send()
      }
    },
  })
}

interface IntrospectionExtension extends Extension {
  property: IntrospectFn
}

interface IntrospectFn extends Fluent.FnProperty<`introspect`> {
  // @ts-expect-error untyped params
  return: Introspect<this['params']>
}

interface Introspect<$Args extends FnParametersProperty> {
  (): Promise<ResolveOutputGql<$Args['state']['context']['config'], IntrospectionQuery> & {}>
}
