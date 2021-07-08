import { isPresent } from 'utils'
import { Tooltip, Spinner } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimeTooltipLabel } from 'components/anime-search'
import tw, { styled } from 'twin.macro'
import { OperationVariables, QueryResult } from '@apollo/client'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { AnimePoster } from 'components/anime'

type DesktopAnimeListProps = {
  searchQuery: QueryResult<
    {
      searchAnime: Query['searchAnime']
    },
    OperationVariables
  >
}

const DesktopAnimeList = ({ searchQuery }: DesktopAnimeListProps) => {
  const [sentryRef] = useInfiniteScroll({
    loading: searchQuery.loading,
    hasNextPage: searchQuery.data?.searchAnime.hasNextPage || false,
    onLoadMore: () =>
      searchQuery.fetchMore({
        variables: {
          page: (searchQuery.data?.searchAnime.page || 0) + 1,
        },
      }),
  })

  return (
    <Container>
      <SectionHeader>Top Rated</SectionHeader>
      <List>
        {searchQuery.data?.searchAnime.hits.filter(isPresent).map((anime) => {
          if (!isPresent(anime.mainImage) || !isPresent(anime.mainImageBlurred))
            return null

          return (
            <Tooltip
              label={<AnimeTooltipLabel anime={anime} />}
              placement="right"
              key={anime.slug}
              hasArrow
            >
              <AnimePost>
                <Link href={`/anime/${anime.slug}`} passHref>
                  <AnimePoster
                    title={anime.title || ''}
                    mainImage={anime.mainImage}
                    mainImageBlurred={anime.mainImageBlurred}
                  />
                </Link>
                <AnimeTitle>{anime.title}</AnimeTitle>
              </AnimePost>
            </Tooltip>
          )
        })}
      </List>

      {/* show loading icon when paginating more */}
      {searchQuery.loading || searchQuery.data?.searchAnime.hasNextPage ? (
        <LoadingPaginationContainer ref={sentryRef}>
          <Spinner size="lg" color="green.500" />
        </LoadingPaginationContainer>
      ) : null}
    </Container>
  )
}

export default DesktopAnimeList

const Container = tw.div`m-auto w-auto hidden md:block`

const List = tw.div`flex flex-wrap pb-10`

const AnimePost = styled.div`
  ${tw`cursor-pointer mr-4 mb-8 text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors`}
  width: 225px;
`

const LoadingPaginationContainer = tw.div`text-center mb-14`

const SectionHeader = tw.h2`text-xl mb-4 font-semibold`

const AnimeTitle = tw.h3`font-semibold text-sm h-12 mt-2`
