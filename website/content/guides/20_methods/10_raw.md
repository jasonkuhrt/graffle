# Raw

<!--@include: @/_snippets/example-links/raw.md-->

Raw methods allow you to work directly with GraphQL syntax. They approximate what `graphql-request` was before it turned into `graffle`.

## Sending Document Nodes

<!--@include: @/_snippets/example-links/rawDocumentNode.md-->

Graffle allows you to send `DocumentNode` instances (created from a class in the `graphql` package) directly.

Graffle exports a utility template tag `gql` to easily create them. Its name is also strategically chosen to leverage automatic GraphQL syntax highlighting that editors generally provide.

You can attain type safety by creating your document with type variables. In a typical real project this would be something that a tool like [GraphQL Code Generator automatically](https://the-guild.dev/graphql/codegen) does for you.

## Sending Strings

<!--@include: @/_snippets/example-links/rawString.md-->

You can skip creating document nodes if you don't need them, instead just sending a string directly.

You can still attain type safety even for the string input by casting your string to `TypedDocumentString`.
