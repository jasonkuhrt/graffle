# Or Throw

<!--@include: @/guides/_example_links/extension_or-throw.md-->

The `OrThrow` extension decorates the builder with new methods for sending requests that will always throw on any error.

## About

It is a more convenient way to send one off requests that throw than manually using [`.with`](../methods/with.md) to configure output. Yet the results are just as type-safe as if you had.

## Getting Started

`OrThrow` is a first party extension shipping in the graffle package.

```ts
import { OrThrow } from 'graffle/extensions'

const graffle = Graffle.create().use(OrThrow())
```

## Methods

For every request method on the client (`.raw`, `.document`, `query.foo`, ...) a new method is added whose name is the same base name with `OrThrow` added as a suffix.

## How It Works

# Or Throw

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
