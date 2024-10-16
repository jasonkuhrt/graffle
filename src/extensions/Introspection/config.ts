import type { GraphQLSchema, IntrospectionOptions } from 'graphql'

export type Input = {
  /**
   * The schema instance or endpoint to introspect. By default uses the value the client was constructed with.
   */
  schema?: string | URL | GraphQLSchema
  /**
   * The introspection query options. By default only some kinds of information are included. See JSDoc for each option's own default value.
   */
  options?: IntrospectionOptions
}

export type Config = {
  schema: null | string | URL | GraphQLSchema
  options: IntrospectionOptions
}

export const defaults = {
  schema: null,
  options: {},
} satisfies Config

export const createConfig = (input?: Input): Config => {
  return {
    schema: input?.schema ?? defaults.schema,
    options: input?.options ?? defaults.options,
  }
}
