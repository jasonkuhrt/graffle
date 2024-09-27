import { Include } from './_include.js'
import { Skip } from './_skip.js'

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
export interface $Fields extends Include.Field, Skip.Field {}

export namespace $Groups {
  export namespace InlineFragment {
    export interface Fields extends Include.Field, Skip.Field {}
  }
}

export const fieldToDef = {
  $include: Include,
  $skip: Skip,
} satisfies Record<keyof $Fields, DirectiveDefinition>
