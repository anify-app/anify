import { Layout } from 'components/display'
import { useQuery } from '@apollo/client'
import { SEARCH_ANIME } from 'gql'
import { DesktopAnimeList, MobileAnimeList } from 'components/anime-page'

const Anime = () => {
  const searchQuery = useQuery<{ searchAnime: Query['searchAnime'] }>(
    SEARCH_ANIME,
    {
      variables: {
        query: '',
        page: 0,
        hitsPerPage: 40,
      },
    },
  )

  return (
    <Layout
      seo={{
        title: 'Anime - Anime Next App',
        description: 'List of all animes sorted by rating.',
        image: '',
        url: '/anime',
      }}
    >
      <DesktopAnimeList searchQuery={searchQuery} />
      <MobileAnimeList searchQuery={searchQuery} />
    </Layout>
  )
}

export default Anime
