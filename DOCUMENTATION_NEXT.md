# Graffle Documentation

# Output

This section covers the ways you can control the return types of methods in a Graffle instance.

The standard GraphQL execution result type in the JavaScript ecosystem (from the `graphql` package) has roughly this type:

```ts
interface GraphQLExecutionResult {
  data?: object
  errors?: GraphQLError[]
  extensions?: unknown[]
}
```

Graffle can return this type but also many other types depending on your configuration. For example:

1. Return the data directly without an envelope.
1. Return all or some categories of errors (return type becomes a union).
1. Return an envelope and place all or some categories of errors into the `errors` field.
1. Throw all or some categories of errors.

Configuration can be done at the constructor level. Method level will also be supported in the future.

```ts
// Constructor Level

const graffle = Graffle.create({
  output: {
    errors: {
      execution: 'throw',
      other: 'return',
    },
  },
})

// Method Level (planned, not implemented yet)

await graffle.query.foo({}, {
  output: {
    envelope: true,
  },
})
```

## Errors

There are three categories of errors:

1. `execution` – Anything that went wrong during execution. Examples: invalid input given, resolver threw an error.
2. `schema` – Only present if the [schema errors](#schema-errors) are being used. Any time a result field returns an error type.
3. `other` – Anything else. Examples: network error during request, extension threw error, your anyware threw an error.

You can choose to output error categories in the following ways:

1. `throw` – Errors from category will be thrown. There is no type safety with this approach.
2. `return` – Errors from category will be returned. The return type will thus become a union type.
3. `default` – Use whatever the default is (you can change the default).

## Envelope

You can choose to use an envelope. When you use an envelope the data will be returned in a `data` property. Additional metadata properties will be exposed:

1. `errors` – errors that you have chosen to include in the envelope.
2. `extensions` – GraphQL execution result extensions.
3. `response` – Only present if [transport](#link-todo) is `http`. The HTTP response to the request that was sent for the given GraphQL document.

## Examples

### Standard GraphQL

```ts
const graffle = Graffle.create({
  output: {
    envelope: {
      errors: {
        execution: true, // Bring execution errors into envelope.
      },
    },
    errors: {
      other: 'throw',
    },
  },
})

assertType<{
  data: {
    foo: string /* or whatever */
  }
  errors: GraphQLError[]
  extensions: unknown[]
  response: Response // Non-standard. Present when using HTTP transport.
}>(await graffle.query.foo())
```

### Full Type Safety

```ts
const graffle = Graffle.create({
  output: {
    defaults: {
      errorChannel: 'return',
    },
    envelope: false,
  },
})

assertType<
  | string /* or whatever */
  | GraphQLError
  | Error
>(await graffle.query.foo())
```

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

# Schema Errors

There is a GraphQL schema design pattern that advocates for encoding errors into your schema. It generally has two parts: One, objects that represent errors; Two, root fields that return unions of one success object and multiple error objects. The benefit of this approach is letting users know about error states and enabling clients to receive them in a type safe way. The general net positive is higher quality and easier to develop software.

Tools that support this pattern:

- https://pothos-graphql.dev/docs/plugins/errors

Articles about this pattern:

- ...

## Generation

This pattern has first class support. By default all objects whose name begin with `Error` will be considered to be "error objects". You can customize this at generate time with your own regular expression.

## Toggle

You can disable schema errors by disabling the generation in the first place or adjusting your constructor.

```ts
const client = Client.create({ schemaErrors: false })
```

## `isError`

You can use a helper function `isError` that will narrow objects to just error objects. For example:

```ts
const result = await client.mutation.foo()
if (isError(result)) {
  result // type is narrowed to just errors
} else {
  result // type is narrowed to just success
}
```

## `orThrow`

You can use `orThrow` method variants to only return the success.

This is achieved by automatically adding `__typename` field to each object-like root field's selection set. Then the returned object name can be analyzed. Example:

```graphql
mutation {
	foo {
		... on Bar {
			id
		}
	}
}
```

becomes:

```graphql
mutation {
	foo {
		__typename
		... on Bar {
			id
		}
	}
}
```

The error that gets thrown is an instance of `Error` and its message is generic. However if all your error objects share an interface that contains a `message` field of `String` type then that message will be automatically be queried for used in the thrown Error. Example:

```graphql
mutation {
	foo {
		... on Bar {
			id
		}
	}
}
```

becomes:

```graphql
mutation {
	foo {
		__typename
		... on Error { # You could name your interface anything.
			message # Your interface must have a message field of String type.
		}
		... on Bar {
			id
		}
	}
}
```

Example:

```ts
const result = await client.mutation.fooOrThrow({ onBar: { id } })
result // type is narrowed to just Bar case.
```
