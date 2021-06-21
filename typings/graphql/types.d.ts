type Maybe<T> = T | null
type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

type Anime = {
  __typename?: 'Anime'
  id: Scalars['String']
  title: Scalars['String']
  genres?: Maybe<Array<Maybe<Scalars['String']>>>
  type: Scalars['String']
  status: Scalars['String']
  rating?: Maybe<Scalars['String']>
  episodes?: Maybe<Scalars['Int']>
  mainImage?: Maybe<Scalars['String']>
  season?: Maybe<Scalars['String']>
  airedStart?: Maybe<Scalars['String']>
  airedEnd?: Maybe<Scalars['String']>
  duration?: Maybe<Scalars['String']>
  sourceMaterialType?: Maybe<Scalars['String']>
  producers?: Maybe<Array<Maybe<Scalars['String']>>>
  licensors?: Maybe<Array<Maybe<Scalars['String']>>>
  studios?: Maybe<Array<Maybe<Scalars['String']>>>
  sources?: Maybe<Array<Maybe<Source>>>
  englishTitle?: Maybe<Scalars['String']>
  japaneseTitle?: Maybe<Scalars['String']>
  synonyms?: Maybe<Array<Maybe<Scalars['String']>>>
}

type Source = {
  __typename?: 'Source'
  name?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

type Query = {
  __typename?: 'Query'
  getAnime?: Maybe<Anime>
  getAllAnime?: Maybe<Array<Maybe<Anime>>>
}

type QueryGetAnimeArgs = {
  title: Scalars['String']
}
