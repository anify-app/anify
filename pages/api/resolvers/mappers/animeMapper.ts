import { AnimeEntity } from 'pages/api/datasources/dynamodb'

export default (animeEntity: AnimeEntity): Anime => {
  const { PK, SK, GSI1PK, GSI1SK, GSI2PK, GSI2SK, ...rest } = animeEntity

  const anime = { ...animeEntity }

  return anime
}
