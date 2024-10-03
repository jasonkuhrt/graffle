// {
//   const d1 = await graffle.gql<TypedDocument.TypedQueryDocumentNode<{ id: number }, { x: 1 }>>``.send({ x: 1 })
//   const d2 = await graffle.gql<TypedDocument.TypedQueryDocumentNode<{ id: number }, { x?: 1 }>>``.send()
//   const d3 = await graffle.gql<TypedDocument.TypedQueryDocumentNode<{ id: number }, { x?: 1 }>>``.send({ x: 1 })
//   const d4 = await graffle.gql<TypedDocument.TypedQueryDocumentNode<{ id: number }, {}>>``.send()
//   const d5 = await graffle.gql<TypedDocument.TypedQueryDocumentNode<{ id: number }, Variables>>``.send()
//   const d6 = await graffle.gql<TypedDocument.TypedQueryDocumentNode<{ id: number }, Variables>>``.send({ x: 1 })
//   const d7 = await graffle.gql<TypedDocument.TypedQueryDocumentNode<{ id: number }, Variables>>``.send('abc', { x: 1 })
// }

// {
//   const d1 = await graffle.gql<TypedDocument.TypedDocumentNode<{ id: number }, { x: 1 }>>``.send({ x: 1 })
//   const d2 = await graffle.gql<TypedDocument.TypedDocumentNode<{ id: number }, { x?: 1 }>>``.send()
//   const d3 = await graffle.gql<TypedDocument.TypedDocumentNode<{ id: number }, { x?: 1 }>>``.send({ x: 1 })
//   const d4 = await graffle.gql<TypedDocument.TypedDocumentNode<{ id: number }, {}>>``.send()
//   const d5 = await graffle.gql<TypedDocument.TypedDocumentNode<{ id: number }, Variables>>``.send()
//   const d6 = await graffle.gql<TypedDocument.TypedDocumentNode<{ id: number }, Variables>>``.send({ x: 1 })
//   const d7 = await graffle.gql<TypedDocument.TypedDocumentNode<{ id: number }, Variables>>``.send('abc', { x: 1 })
// }
