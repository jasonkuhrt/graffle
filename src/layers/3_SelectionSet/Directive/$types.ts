import { Defer } from './_defer.js'
import { Include } from './_include.js'
import { Skip } from './_skip.js'
import { Stream } from './_stream.js'

export interface DirectiveDefinition {
  name: string
  create: (...args: any[]) => DirectiveLike
}

export interface DirectiveLike {
  name: string
  args: object
}

/**
 * @see https://spec.graphql.org/draft/#sec-Type-System.Directives.Built-in-Directives
 */
export interface $Fields extends Defer.Field, Stream.Field, Include.Field, Skip.Field {}

export const fieldToDef = {
  $defer: Defer,
  $stream: Stream,
  $include: Include,
  $skip: Skip,
} satisfies Record<keyof $Fields, DirectiveDefinition>
