import { ApolloServer } from 'apollo-server-micro'
import { schema } from './schemas'
import { resolvers } from './resolvers'
import { DynamoDB } from './datasources/dynamodb'

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => ({
    dynamodb: new DynamoDB(),
  }),
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
