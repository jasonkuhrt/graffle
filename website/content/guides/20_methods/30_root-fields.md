# Root Fields <GeneratedClientBadge />

<!-- @include: @/_snippets/example-links/root-field.md -->

Every root field (aka. entrypoint) in the GraphQL schema is made available as a method on the generated client. Root fields are any field on the root types: `Query`, `Mutation`, and `Subscription`.

For example, if you have the following root field in your schema:

```graphql
type Query {
	hello: String
}
```

Then the generated client would have a `hello` method.

```typescript
const result = await graffle.query.hello()
```

## Example

<!-- @include: @/_snippets/examples/generated/root-field.md -->
