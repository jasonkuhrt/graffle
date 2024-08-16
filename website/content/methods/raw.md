# Raw

Raw methods allow you to work directly with GraphQL queries and data types. They have [`...OrThrow`](#orthrow) variants like other methods. They force you to use the [envelope](#envelope), however your configuration for [error channels](#errors) is still honoured.

> Aside: These methods are approximately what `graphql-request` was before it turned into Graffle.

## DocumentNode Document

Use the `gql` template tag to get syntax highlighting (GraphQL editor extensions special case this template tag name) and construction of `TypedQueryDocumentNode`s from strings:

Example ([see full runnable example](./examples/raw.ts)):

```ts
import { gql } from 'graffle/utils'

const document = gql`
  query MyThing {
    stuff {
      foo
      bar
    }
  }
`

const result = await graffle.raw({ document })
```

### Type Safety

You can attain type safety by creating your document with type variables. In a typical real project this would be something that a tool like [GraphQL Code Generator automatically](https://the-guild.dev/graphql/codegen) does for you.

Example ([see full runnable example](./examples/raw-typed.ts)):

```ts
const document = gql<{ stuff: { foo: string; bar: number }, { filter: boolean } }>`
  query MyThing ($filter:boolean) {
    stuff (filter:$filter) {
      foo
      bar
    }
  }
`

const result = await graffle.raw({
  document,
  // Correctly typed variables now required.
  variables: {
    filter: true,
  }
})
```

## String Document

You can skip creating document nodes if you need or wish by using `.rawString`.

> Aside: During interface design, using an overload to combine `.raw` and `.rawString` was at first used but soon abandoned because of the poor intellisense experience TypeScript overloads currently have in editors.

Example ([see full runnable example](./examples/rawString.ts)):

```ts
const document = `
  query MyThing {
    stuff (filter:$filter) {
      foo
      bar
    }
  }
`

const result = await graffle.rawString({ document })
```

### Type Safety

You can attain type safety by casting your document with `TypedDocumentString`. In a typical project your tooling (like GraphQL Code Generator) would do this for you.

Example ([see full runnable example](./examples/rawString-typed.ts)):

```ts
import { TypedDocumentString } from 'graffle/utils'

const document = `
  query MyThing ($filter: boolean) {
    stuff (filter: $filter) {
      foo
      bar
    }
  }
` as TypedDocumentString<{ stuff: { foo: string; bar: number }, { filter: boolean } }>

const result = await graffle.rawString({
  document,
  // Correctly typed variables now required.
  variables: {
    filter: true,
  }
})
```
