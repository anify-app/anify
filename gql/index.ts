import { gql } from '@apollo/client'

export const SEARCH_ANIME = gql`
  query SearchAnime($query: String!, $page: Int, $hitsPerPage: Int) {
    searchAnime(query: $query, page: $page, hitsPerPage: $hitsPerPage) {
      hits {
        shortId
        slug
        title
        englishTitle
        mainImage
        type
        status
        genres
        mainImageBlurred
        score
        colors
      }
      hasNextPage
      page
    }
  }
`
