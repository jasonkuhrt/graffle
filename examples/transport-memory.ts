import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { Graffle } from '../src/entrypoints/main.js'
import { showJson } from './$/helpers.js'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: `Query`,
    fields: {
      foo: {
        type: GraphQLString,
        resolve: () => `bar`,
      },
    },
  }),
})

const graffle = Graffle.create({ schema })

const result = await graffle.rawString({ document: `{ foo }` })

showJson(result)
