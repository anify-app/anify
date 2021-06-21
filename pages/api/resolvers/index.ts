import { AnimeRepository } from '../db/index'
import animeMapper from './mappers/animeMapper'

export const resolvers = {
  Query: {
    getAllAnime: async () => {
      try {
        const res = await AnimeRepository.scan().exec()
        const animes = res.map((anime) => animeMapper(anime))
        return animes
      } catch (error) {
        throw error
      }
    },
    getAnime: async (_: null, args: QueryGetAnimeArgs) => {
      try {
        const res = await AnimeRepository.get({
          PK: `ANIME#${args.id}`,
          SK: 'VERSION#v1',
        })

        const anime = animeMapper(res)

        return anime
      } catch (error) {
        throw error
      }
    },
  },
}
