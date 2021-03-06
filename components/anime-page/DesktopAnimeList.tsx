import { isPresent } from 'utils'
import { Tooltip } from '@chakra-ui/react'
import Link from 'next/link'
import { AnimeTooltipLabel } from 'components/anime-search'
import tw, { styled } from 'twin.macro'
import { OperationVariables, QueryResult } from '@apollo/client'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { AnimePoster } from 'components/anime'
import { Spinner } from 'elements'

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
                <Link href={`/anime/${anime.shortId}/${anime.slug}`} passHref>
                  <AnimePoster
                    title={anime.englishTitle || anime.title || ''}
                    mainImage={anime.mainImage}
                    mainImageBlurred={anime.mainImageBlurred}
                  />
                </Link>
                <AnimeTitle>{anime.englishTitle || anime.title}</AnimeTitle>
              </AnimePost>
            </Tooltip>
          )
        })}
      </List>

      {/* show loading icon when paginating more */}
      {searchQuery.loading || searchQuery.data?.searchAnime.hasNextPage ? (
        <LoadingPaginationContainer ref={sentryRef}>
          <Spinner />
        </LoadingPaginationContainer>
      ) : null}
    </Container>
  )
}

export default DesktopAnimeList

const Container = tw.div`m-auto w-auto hidden md:block`

const List = tw.div`flex flex-wrap`

const AnimePost = styled.div`
  ${tw`cursor-pointer mr-4 mb-8 text-gray-700 dark:text-gray-300 hover:color[var(--primary-color)] dark:hover:color[var(--primary-color-dark)] transition-colors`}
  width: 225px;
`

const LoadingPaginationContainer = tw.div`text-center pb-14 mt-12`

const SectionHeader = tw.h2`text-xl mb-4 font-semibold`

const AnimeTitle = tw.h3`font-semibold text-sm h-12 mt-2`
