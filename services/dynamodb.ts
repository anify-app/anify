import { UserInputError } from 'apollo-server-micro'
import * as dynamoose from 'dynamoose'
import { Document } from 'dynamoose/dist/Document'
import { ScanResponse } from 'dynamoose/dist/DocumentRetriever'
import { ModelType } from 'dynamoose/dist/General'
import { Schema } from 'dynamoose/dist/Schema'
import { DataSource } from 'apollo-datasource'

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
  title!: string | null
  type!: string | null
  genres: Array<string> = []
  status!: string | null
  sourceMaterialType!: string | null
  rating!: string | null
  episodes!: number | null
  description!: string | null
  mainImage!: string | null
  season!: string | null
  airedStart!: string | null
  slug!: string
  airedEnd!: string | null
  duration!: string | null
  producers: Array<string> = []
  licensors: Array<string> = []
  studios: Array<string> = []
  sources: Array<{
    name: string
    url: string
  }> = []
  englishTitle!: string | null
  createdAt!: number
  updatedAt!: number
  japaneseTitle!: string | null
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
        const animes: ScanResponse<AnimeEntity> = await this.animeRepository
          .scan('slug')
          .exists()
          .limit(args.first)
          .exec()

        return animes.map((anime) => this.animeMapper(anime))
      }

      const animes: ScanResponse<AnimeEntity> = await this.animeRepository
        .scan('slug')
        .exists()
        .all(100)
        .exec()

      // filter conditions
      if (args.skip)
        return animes
          .slice(args.skip - 1, undefined)
          .map((anime) => this.animeMapper(anime))
      if (args.last)
        return animes
          .slice(animes.length - args.last, undefined)
          .map((anime) => this.animeMapper(anime))

      return animes.map((anime) => this.animeMapper(anime))
    } catch (error) {
      throw error
    }
  }
  async getAnime(args: QueryGetAnimeArgs) {
    try {
      const anime = await this.animeRepository.get({
        PK: `ANIME#${args.slug}`,
        SK: 'VERSION#v1',
      })

      return this.animeMapper(anime)
    } catch (error) {
      throw error
    }
  }
  animeMapper(animeEntity: AnimeEntity): Anime {
    const {
      PK,
      SK,
      GSI1PK,
      GSI1SK,
      GSI2PK,
      GSI2SK,
      createdAt,
      updatedAt,
      ...rest
    } = animeEntity

    const anime = { ...rest }

    return anime
  }
}
