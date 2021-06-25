import { DynamoDB } from '../datasources/dynamodb'
type DataSources = { dataSources: { dynamodb: DynamoDB } }

export const resolvers = {
  Query: {
    getAllAnime: async (
      _: null,
      args: QueryGetAllAnimeArgs,
      { dataSources }: DataSources,
    ) => dataSources.dynamodb.getAllAnime(args),
    getAnime: async (
      _: null,
      args: QueryGetAnimeArgs,
      { dataSources }: DataSources,
    ) => dataSources.dynamodb.getAnime(args),
  },
}
