# GraphQL Request Documentation

# Output

GraphQL execution from the `graphql` package has this general pattern:

```ts
interface GraphQLExecutionResult {
  data?: object
  errors?: GraphQLError[]
  extensions?: []
}
```

```ts
Graffle.create({
  output: {
    throw: {
      schema: true,
      execution: true,
      other: true,
    },
  },
})
```

You can configure this output in multiple ways:

1. Return the data directly without an envelope.
1. Return an envelope with data in a `data` field. Gain access to other fields like `errors`, `extensions`, `response` (if using HTTP transport).
1. If using an envelope, place all or some categories of errors into an `errors` field.
1. Return all or some categories of errors (return type becomes a union).
1. Throw all or some categories of errors.

. This allows you to tailor the client better to your specific use-case.

The only client method that is not affected by return mode is `raw` which will _always_ return a standard GraphQL result type.

Here is a summary table of the modes:

| Mode             | Throw Sources (no type safety)                                                                                 | Returns (type safe)                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `graphql`        | 1. Extensions<br>2. Fetch                                                                                      | 1. `GraphQLExecutionResult`                                                                          |
| `graphqlSuccess` | 1. Extensions<br>2. Fetch<br>3. GraphQLExecutionResult.errors                                                  | 1. `GraphQLExecutionResult` without `.errors`                                                        |
| `data` (default) | 1. Extensions<br>2. Fetch<br>3. GraphQLExecutionResult.errors                                                  | 1. `GraphQLExecutionResult.data`                                                                     |
| `dataSuccess`    | 1. Extensions<br>2. Fetch<br>3. GraphQLExecutionResult.errors<br> 4. GraphQLExecutionResult.data Schema Errors | `GraphQLExecutionResult.data` without schema errors                                                  |
| `dataAndErrors`  |                                                                                                                | 1. `GraphQLExecutionResult.data`<br>2. Errors from: Extensions, Fetch, GraphQLExecutionResult.errors |

## `graphql`

Return the standard graphql execution output.

## `graphqlSuccess`

Return the standard graphql execution output. However, if there would be any errors then they're thrown as an `AggregateError`.
This mode acts like you were using [`OrThrow`](#orthrow) method variants all the time.

## `dataSuccess`

Return just the data excluding [schema errors](#schema-errors). Errors are thrown as an `AggregateError`.
This mode acts like you were using [`OrThrow`](#orthrow) method variants all the time.

This mode is only available when using [schema errors](#schema-errors).

## `data`

Return just the data including [schema errors](#schema-errors) (if using). Other errors are thrown as an `AggregateError`.

**This mode is the default.**

## `dataAndErrors`

Return a union type of data and errors. This is the most type-safe mode. It never throws.

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
