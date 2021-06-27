import { AnimeEntity } from 'pages/api/datasources/dynamodb'

const animeMapper = (animeEntity: AnimeEntity): Anime => {
  const { PK, SK, GSI1PK, GSI1SK, GSI2PK, GSI2SK, ...rest } = animeEntity

  const anime = { ...animeEntity }

  // @ts-expect-error
  return anime
}

export default animeMapper
