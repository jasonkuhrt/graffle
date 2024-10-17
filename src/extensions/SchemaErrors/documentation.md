# Schema Errors

This extension supports a GraphQL schema design pattern that advocates for encoding errors into your schema. It generally has two parts: One, objects that represent errors; Two, root fields that return unions of one success object and multiple error objects. The benefit of this approach is letting users know about error states and enabling clients to receive them in a type safe way. The general net positive is higher quality and easier to develop software.

## Getting Started

This extension requires generation and also itself extends the generator. You must apply it at gentime and runtime.

```ts
// graffle.config.ts

import { SchemaErrors } from 'graffle/extensions'
import { Graffle } from 'graffle/generator'

export default Graffle
  .create()
  .use(SchemaErrors())
```

```ts twoslash
// your/app/code.ts
import { Graffle } from 'graffle'
import { SchemaErrors } from 'graffle/extensions'

const graffle = Graffle.create({ schema: '...' }).use(SchemaErrors())
```

## Configuration

Configuration is split between gentime and runtime since this extension extends the Graffle generator as well.

### Gentime

#### Identifying Error Objects

By default all objects whose name begin with `Error` will be considered to be "error objects". You can customize this with your own function.

```ts
// graffle.config.ts
import { SchemaErrors } from 'graffle/extensions/schema-errors/generator'
import { Graffle } from 'graffle/generator'

export default Graffle
  .create()
  .use(SchemaErrors({
    isErrorType: (type) => type.name.match(/^Foo/),
  }))
```

## Methods

### `isError`

You can use a helper method `isError` that will narrow objects to just error objects. For example:

```ts
const result = await graffle.mutation.foo()
if (graffle.isError(result)) {
  result // type is narrowed to just errors
} else {
  result // type is narrowed to just success
}
```

## About Runtime Behavior

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
const result = await client.throws().mutation.foo({ onBar: { id } })
result // type is narrowed to just Bar case.
```

## Appendix

### Server tools that support schema errors.

- https://pothos-graphql.dev/docs/plugins/errors

### Articles about schema errors.

- ...
