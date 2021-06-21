import { gql } from 'apollo-server-micro'

export const schema = gql`
  type Anime {
    id: String!
    title: String
    genres: [String]
    type: String
    status: String
    rating: String
    episodes: Int
    mainImage: String
    season: String
    airedStart: String
    airedEnd: String
    duration: String
    sourceMaterialType: String
    producers: [String]
    licensors: [String]
    studios: [String]
    sources: [Source]
    englishTitle: String
    japaneseTitle: String
    synonyms: [String]
  }

  type Source {
    name: String
    url: String
  }

  type Query {
    getAnime(id: String!): Anime
    getAllAnime(first: Int, last: Int, skip: Int): [Anime]
  }
`
