import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { Server } from 'http'
import { graphqlUploadExpress, GraphQLUpload, FileUpload } from 'graphql-upload'

const typeDefs = `
  scalar Upload

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  type Mutation {
    uploadFile(file: Upload!): String!
  }

  type User {
    id: Int!
  }
`

export const users = [{ id: 1 }, { id: 2 }, { id: 3 }]

const resolvers = {
  Query: {
    users: () => Promise.resolve(users),
    user: (source: any, { id }: { id: number }) =>
      Promise.resolve(users.find((user) => user.id === id) || null),
  },
  Mutation: {
    async uploadFile(source: any, { file }: { file: Promise<FileUpload> }) {
      const { filename } = await file
      return filename
    },
  },
  Upload: GraphQLUpload as any,
}

export default async function startServer() {
  const app = express()

  const apolloServer = new ApolloServer({ typeDefs, resolvers, uploads: false })

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
  apolloServer.applyMiddleware({ app })

  let server: Server

  await new Promise<void>((resolve, reject) => {
    server = app.listen(0, (err) => (err ? reject(err) : resolve()))
  })

  return server!
}
