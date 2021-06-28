import { Agolia } from 'services/agolia'
import { DynamoDB } from 'services/dynamodb'
type DataSources = { dataSources: { dynamodb: DynamoDB; agolia: Agolia } }

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
    searchAnime: async (
      _: null,
      args: QuerySearchAnimeArgs,
      { dataSources }: DataSources,
    ) => dataSources.agolia.searchAnime(args),
  },
}
