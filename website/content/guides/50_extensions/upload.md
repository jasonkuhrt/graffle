# File Upload

<!--@include: @/guides/_example_links/extension_upload.md-->

Bring support for [GraphQL Multipart Request](https://github.com/jaydenseric/graphql-multipart-request-spec) to Graffle.

## About

## Getting Started

`Upload` is a first party extension shipping in the graffle package.

```ts
import { Upload } from 'graffle/extensions'

const graffle = Graffle.create().use(Upload())
```
