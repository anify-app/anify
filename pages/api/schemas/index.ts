import { gql } from 'apollo-server-micro'

export const schema = gql`
  type Anime {
    slug: String!
    title: String
    genres: [String]
    type: String
    status: String
    rating: String
    episodes: Int
    mainImage: String
    mainImageBlurred: String
    season: String
    airedStart: String
    description: String
    score: Int
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
    getAnime(slug: String!): Anime!
    getAllAnime(first: Int, last: Int, skip: Int): [Anime!]!
    searchAnime(
      query: String!
      page: Int
      hitsPerPage: Int
      offset: Int
      limit: Int
    ): SearchResponse!
  }

  type SearchResponse {
    hits: [Anime]!
    page: Int!
    nbPages: Int!
    nbHits: Int!
    hitsPerPage: Int!
    message: String
    length: Int
    offset: Int
    hasNextPage: Boolean!
  }
`
