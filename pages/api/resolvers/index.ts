import * as dynamoose from 'dynamoose'
import { Document } from 'dynamoose/dist/Document'
import { AnimeRepository } from '../db/index'

export const resolvers = {
  Query: {
    getAllAnime: async () => {
      try {
      } catch (error) {
        throw error
      }
    },
    getAnime: async (_: null, args: QueryGetAnimeArgs) => {
      try {
        // AnimeRepository.get({ PK: { entity: 'ANIME', id: args.title }, SK: {} })
      } catch (error) {
        throw error
      }
    },
  },
}
