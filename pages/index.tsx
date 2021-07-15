import { useRef } from 'react'
import { useQuery } from '@apollo/client'
import { SEARCH_ANIME } from 'gql'
import { Layout } from 'components/display'
import { DesktopAnimeList, MobileAnimeList } from 'components/anime-page'
import { CallToAction } from 'components/home'
import { Divider } from '@chakra-ui/react'
import tw, { styled } from 'twin.macro'

const Home = () => {
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
  const homeDividerRef = useRef<HTMLHRElement>(null)

  return (
    <Layout
      seo={{
        title: 'Home – Anify',
        description: `Cutting edge anime platform designed for the average viewer. Oh and it's also 100% open-source.`,
        image: '',
        url: '/',
      }}
      shouldFullyCollapse
    >
      <CallToAction homeDividerRef={homeDividerRef} />
      <SectionDivider ref={homeDividerRef} />
      <DesktopAnimeList searchQuery={searchQuery} />
      <MobileAnimeList searchQuery={searchQuery} />
    </Layout>
  )
}

export default Home

const SectionDivider = styled(Divider)`
  margin-top: 40px;
  ${tw`mb-4 md:mb-12`}
`
