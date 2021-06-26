import { ApolloServer } from 'apollo-server-micro'
import { schema } from './schemas'
import { resolvers } from './resolvers'
import { DynamoDB } from './datasources/dynamodb'
import { Agolia } from './datasources/agolia'

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => ({
    dynamodb: new DynamoDB(),
    agolia: new Agolia(),
  }),
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
