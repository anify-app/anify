import { UserInputError } from 'apollo-server-micro'
import * as dynamoose from 'dynamoose'
import { Document } from 'dynamoose/dist/Document'
import { ScanResponse } from 'dynamoose/dist/DocumentRetriever'
import { ModelType } from 'dynamoose/dist/General'
import { Schema } from 'dynamoose/dist/Schema'
import { DataSource } from 'apollo-datasource'
import animeMapper from '../resolvers/mappers/animeMapper'

type AnimeTableAttributes = { id: string; entity: string }

dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})
export class AnimeEntity extends Document {
  PK!: AnimeTableAttributes
  SK!: AnimeTableAttributes
  GSI1PK: AnimeTableAttributes | undefined
  GSI1SK: AnimeTableAttributes | undefined
  GSI2PK: AnimeTableAttributes | undefined
  GSI2SK: AnimeTableAttributes | undefined
  title: string = ''
  type: string = ''
  genres: Array<string> = []
  status: string = ''
  sourceMaterialType: string = ''
  rating: string | undefined
  episodes: number | undefined
  mainImage: string | undefined
  season: string | undefined
  airedStart: string | undefined
  slug!: string
  airedEnd: string | undefined
  duration: string | undefined
  producers: Array<string> = []
  licensors: Array<string> = []
  studios: Array<string> = []
  sources: Array<{
    name: string
    url: string
  }> = []
  englishTitle: string | undefined
  japaneseTitle: string | undefined
  synonyms: Array<string> = []
}

const schema = new dynamoose.Schema(
  {
    //@ts-expect-error we allow val to have AnimeTableAttributes
    PK: {
      type: String,
      hashKey: true,
      set: (val: AnimeTableAttributes) => `${val.entity}#${val.id}`,
      get: (val: string) => ({
        entity: val.split('#')[0],
        id: val.split('#')[1],
      }),
    },
    //@ts-expect-error we allow val to have AnimeTableAttributes
    SK: {
      type: String,
      rangeKey: true,
      set: (val: AnimeTableAttributes) => `${val.entity}#${val.id}`,
      get: (val: string) => ({
        entity: val.split('#')[0],
        id: val.split('#')[1],
      }),
    },
    //@ts-expect-error we allow val to have AnimeTableAttributes
    GSI1PK: {
      type: String,
      index: {
        name: 'GSI1',
        rangeKey: 'GSI1SK',
      },
      set: (val: AnimeTableAttributes) => `${val.entity}#${val.id}`,
      get: (val: string) => ({
        entity: val.split('#')[0],
        id: val.split('#')[1],
      }),
    },
    //@ts-expect-error we allow val to have AnimeTableAttributes
    GSI1SK: {
      type: String,
      set: (val: AnimeTableAttributes) => `${val.entity}#${val.id}`,
      get: (val: string) => ({
        entity: val.split('#')[0],
        id: val.split('#')[1],
      }),
    },
    //@ts-expect-error we allow val to have AnimeTableAttributes
    GSI2PK: {
      type: String,
      index: {
        name: 'GSI2',
        rangeKey: 'GSI2SK',
      },
      set: (val: AnimeTableAttributes) => `${val.entity}#${val.id}`,
      get: (val: string) => ({
        entity: val.split('#')[0],
        id: val.split('#')[1],
      }),
    },
    //@ts-expect-error we allow val to have AnimeTableAttributes
    GSI2SK: {
      type: String,
      set: (val: AnimeTableAttributes) => `${val.entity}#${val.id}`,
      get: (val: string) => ({
        entity: val.split('#')[0],
        id: val.split('#')[1],
      }),
    },
  },
  {
    saveUnknown: true, // use attributes which aren't defined in the schema
    timestamps: true,
  },
)

export class DynamoDB extends DataSource {
  schema: Schema
  animeRepository: ModelType<AnimeEntity>
  constructor() {
    super()
    this.schema = schema
    this.animeRepository = dynamoose.model<AnimeEntity>('anime', this.schema, {
      create: false,
    })
  }

  async getAllAnime(args: QueryGetAllAnimeArgs) {
    try {
      if (
        [args.first, args.skip, args.last].filter((arg) => arg != null).length >
        1
      )
        throw new UserInputError('You may only have one argument')

      if (args.first) {
        const res: ScanResponse<AnimeEntity> = await this.animeRepository
          .scan('slug')
          .exists()
          .limit(args.first)
          .exec()

        return res.map((anime) => animeMapper(anime))
      }

      const res: ScanResponse<AnimeEntity> = await this.animeRepository
        .scan('slug')
        .exists()
        .all(100)
        .exec()

      const animes = res.map((anime) => animeMapper(anime))

      // filter conditions
      if (args.skip) return animes.slice(args.skip - 1, undefined)
      if (args.last) return animes.slice(animes.length - args.last, undefined)

      return animes
    } catch (error) {
      throw error
    }
  }
  async getAnime(args: QueryGetAnimeArgs) {
    try {
      const res = await this.animeRepository.get({
        PK: `ANIME#${args.slug}`,
        SK: 'VERSION#v1',
      })

      const anime = animeMapper(res)

      return anime
    } catch (error) {
      throw error
    }
  }
}
