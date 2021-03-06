import { gql } from 'apollo-server-micro'

export const schema = gql`
  type Anime {
    slug: String!
    title: String
    genres: [String]
    type: String
    status: String
    id: String
    shortId: String!
    colors: [String]
    rating: String
    episodes: Int
    mainImage: String
    relations: AnimeRelations
    mainImageBlurred: String
    season: String
    airedStart: String
    description: String
    score: Float
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
    trailer: String
  }

  type Source {
    name: String
    url: String
  }

  type AnimeRelations {
    sideStory: [Anime]!
    summary: [Anime]!
    other: [Anime]!
    alternativeVersion: [Anime]!
    alternativeSetting: [Anime]!
    sequel: [Anime]!
    spinOff: [Anime]!
    prequel: [Anime]!
  }

  type Query {
    getAnime(slug: String!, shortId: String!): Anime!
    getAnimeBySlug(slug: String!): Anime!
    getAllAnime(first: Int, last: Int, skip: Int): [Anime!]!
    searchAnime(
      query: String!
      page: Int
      hitsPerPage: Int
      offset: Int
      limit: Int
      searchableAttributes: [String!]
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
