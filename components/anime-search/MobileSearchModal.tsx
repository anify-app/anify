import Image from 'next/image'
import { isPresent } from 'utils'
import Link from 'next/link'
import { InputLeftElement, InputGroup, Input, Divider } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { OperationVariables, QueryResult } from '@apollo/client'
import tw, { styled } from 'twin.macro'
import { HiSearch, HiInbox } from 'react-icons/hi'
import { TypeBadge, StatusBadge } from 'components/anime'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { HiStar } from 'react-icons/hi'
import { Spinner } from 'elements'
import { useTheme } from 'next-themes'
import Div100vh from 'react-div-100vh'

type MobileSearchModalProps = {
  onClose: () => void
  searchTerm: string
  onSearchTermChange: (value: string) => void
  searchQuery: QueryResult<
    {
      searchAnime: Query['searchAnime']
    },
    OperationVariables
  >
  onPaginate: () => void
}

const MobileSearchModal = ({
  onClose,
  searchTerm: clientSearchTerm,
  onSearchTermChange,
  searchQuery,
  onPaginate,
}: MobileSearchModalProps) => {
  const { resolvedTheme } = useTheme()
  const [sentryRef] = useInfiniteScroll({
    loading: searchQuery.loading,
    hasNextPage: searchQuery.data?.searchAnime.hasNextPage || false,
    onLoadMore: onPaginate,
  })

  return (
    <Modal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      onClick={onClose}
    >
      <Scroll>
        <ModalContent>
          <SearchInputGroup>
            <InputLeftElement pointerEvents="none">
              <ModalSearchIcon />
            </InputLeftElement>
            <SearchInput
              onClick={(e) => e.stopPropagation()}
              size="lg"
              placeholder="Search anime"
              value={clientSearchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              focusBorderColor={
                resolvedTheme === 'dark' ? 'green.200' : 'green.500'
              }
              variant="flushed"
              textColor={resolvedTheme === 'dark' ? 'gray.700' : 'gray.400'}
              borderColor={resolvedTheme === 'dark' ? 'gray.700' : 'gray.400'}
              autoFocus
            />
          </SearchInputGroup>
          <List>
            {searchQuery.data?.searchAnime.hits
              .filter(isPresent)
              .map((anime) => {
                if (
                  !isPresent(anime.mainImage) ||
                  !isPresent(anime.mainImageBlurred)
                )
                  return null

                return (
                  <AnimePost key={anime.slug}>
                    <Link href={`/anime/${anime.slug}`} passHref>
                      <AnimeCard>
                        <ImageContainer>
                          <Image
                            src={anime.mainImage}
                            width={56.25}
                            height={87.5}
                            layout="fixed"
                            alt={`${anime?.title} poster.`}
                            placeholder="blur"
                            blurDataURL={anime.mainImageBlurred}
                            unoptimized
                          />
                        </ImageContainer>
                        <Information>
                          <Title>{anime?.title}</Title>

                          <Badges>
                            {anime?.type ? (
                              <TypeBadge type={anime.type} />
                            ) : null}
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

          {/* show empty when no results exist */}
          {searchQuery.data?.searchAnime.hits.length === 0 ? (
            <EmptyContainer>
              <EmptyIcon size="36px" />
              <p>No results found</p>
            </EmptyContainer>
          ) : null}

          {/* show loading icon when paginating more */}
          {searchQuery.loading || searchQuery.data?.searchAnime.hasNextPage ? (
            <LoadingPaginationContainer ref={sentryRef}>
              <Spinner />
            </LoadingPaginationContainer>
          ) : null}
        </ModalContent>
      </Scroll>
    </Modal>
  )
}

export default MobileSearchModal

const Modal = tw(
  motion.div,
)`absolute block md:hidden top-0 left-0 bg-white dark:bg-black bg-opacity-100! z-50`

// Div100vh library required to have correct behavior on mobile safari
const Scroll = tw(Div100vh)`pt-20 px-8 w-screen overflow-y-auto`

const ModalContent = tw.div`flex flex-col items-center`

const SearchInputGroup = tw(InputGroup)`w-full`

const SearchInput = tw(
  Input,
)`text-gray-900! dark:text-white! mb-20 placeholder-gray-800! dark:placeholder-gray-400!`

const ModalSearchIcon = tw(
  HiSearch,
)`w-5 h-5 mt-1.5 text-gray-400 dark:text-gray-700`

const EmptyContainer = tw.div`flex items-center flex-col opacity-50`

const EmptyIcon = tw(HiInbox)`mb-2`

const List = tw.div`flex flex-col w-full`

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
