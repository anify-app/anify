import { UserInputError } from 'apollo-server-micro'
import { AnimeRepository } from '../db/index'
import animeMapper from './mappers/animeMapper'

export const resolvers = {
  Query: {
    getAllAnime: async (_: null, args: QueryGetAllAnimeArgs) => {
      try {
        if (
          [args.first, args.skip, args.last].filter((arg) => arg != null)
            .length !== 1
        )
          throw new UserInputError('You may only have one argument')

        const res = await AnimeRepository.scan().exec()
        const animes = res.map((anime) => animeMapper(anime))

        // filter conditions
        if (args.skip) return animes.slice(args.skip - 1, undefined)
        if (args.last) return animes.slice(animes.length - args.last, undefined)
        if (args.first) return animes.slice(0, args.first)

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
