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
