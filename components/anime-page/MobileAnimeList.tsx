import { isPresent } from 'utils'
import { Divider } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import { TypeBadge, StatusBadge } from 'components/anime'
import tw, { styled } from 'twin.macro'
import { OperationVariables, QueryResult } from '@apollo/client'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { HiStar } from 'react-icons/hi'
import { Spinner } from 'elements'

type MobileAnimeListProps = {
  searchQuery: QueryResult<
    {
      searchAnime: Query['searchAnime']
    },
    OperationVariables
  >
}

const MobileAnimeList = ({ searchQuery }: MobileAnimeListProps) => {
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
            <AnimePost key={anime.slug}>
              <Link href={`/anime/${anime.shortId}/${anime.slug}`} passHref>
                <AnimeCard>
                  <ImageContainer>
                    <Image
                      src={anime.mainImage}
                      width={56.25}
                      height={87.5}
                      layout="fixed"
                      alt={`${anime.englishTitle || anime?.title} poster.`}
                      placeholder="blur"
                      blurDataURL={anime.mainImageBlurred}
                      unoptimized
                    />
                  </ImageContainer>
                  <Information>
                    <Title>{anime.englishTitle || anime?.title}</Title>

                    <Badges>
                      {anime?.type ? <TypeBadge type={anime.type} /> : null}
                      &nbsp;
                      {anime?.status ? (
                        <StatusBadge status={anime.status} />
                      ) : null}
                    </Badges>
                    <Score>
                      <ScoreIcon />
                      <p>
                        {anime.score || '-'}
                        <ScoreTotal>/10</ScoreTotal>
                      </p>
                    </Score>
                  </Information>
                </AnimeCard>
              </Link>
              <ItemDivider />
            </AnimePost>
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

export default MobileAnimeList

const Container = tw.div`m-auto w-auto block md:hidden`

const List = tw.div`flex flex-col w-full`

const SectionHeader = tw.h2`text-xl mb-4 font-semibold`

const AnimePost = tw.span`cursor-pointer`

const AnimeCard = tw.div`flex flex-row items-center w-full pt-0.5`

const Information = tw.div`ml-4 flex-grow`

const Badges = tw.div``

const Title = tw.h2`leading-5! align-middle`

const LoadingPaginationContainer = tw.div`text-center pb-12 mt-12`

const Score = tw.div`flex items-center`

const ScoreIcon = tw(HiStar)`mr-0.5 h-5 w-5`

const ScoreTotal = tw.span`text-xs opacity-50`

const ImageContainer = styled.div`
  width: 56.25px;
`

const ItemDivider = tw(Divider)`mt-2 mb-3`
