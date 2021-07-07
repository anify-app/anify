import Image from 'next/image'
import { isPresent } from 'utils'
import { AnimeTooltipLabel } from 'components/anime-search'
import Link from 'next/link'
import {
  Tooltip,
  InputLeftElement,
  InputGroup,
  Spinner,
  Input,
  useColorMode,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { OperationVariables, QueryResult } from '@apollo/client'
import tw from 'twin.macro'
import { HiSearch, HiInbox } from 'react-icons/hi'
import useInfiniteScroll from 'react-infinite-scroll-hook'

type DesktopSearchModalProps = {
  onClose: () => void
  searchTerm: string
  onSearchTermChange: (value: string) => void
  searchQuery: QueryResult<
    {
      searchAnime: Query['searchAnime']
    },
    OperationVariables
  >
  searchInputRef: React.RefObject<HTMLInputElement>
  onPaginate: () => void
}

const DesktopSearchModal = ({
  onClose,
  searchTerm: clientSearchTerm,
  onSearchTermChange,
  searchQuery,
  searchInputRef,
  onPaginate,
}: DesktopSearchModalProps) => {
  const { colorMode } = useColorMode()
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
      <Scroll
        className={colorMode === 'dark' ? 'os-theme-light' : 'os-theme-dark'}
        options={{
          scrollbars: { autoHide: 'scroll' },
        }}
      >
        <ModalContent>
          <SearchInputGroup>
            <InputLeftElement pointerEvents="none">
              <ModalSearchIcon />
            </InputLeftElement>
            <SearchInput
              onClick={(e) => e.stopPropagation()}
              size="lg"
              placeholder="Search anime"
              ref={searchInputRef}
              value={clientSearchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              focusBorderColor="green.500"
              variant="flushed"
              textColor={colorMode === 'dark' ? 'gray.700' : 'gray.400'}
              borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.400'}
            />
          </SearchInputGroup>
          <Grid>
            {searchQuery.data?.searchAnime.hits
              .filter(isPresent)
              .map((anime) => {
                if (
                  !isPresent(anime.mainImage) ||
                  !isPresent(anime.mainImageBlurred)
                )
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
                        <span>
                          <Image
                            src={anime.mainImage}
                            width={225}
                            height={350}
                            layout="fixed"
                            alt={`${anime?.title} poster.`}
                            placeholder="blur"
                            blurDataURL={anime.mainImageBlurred}
                            priority
                          />
                        </span>
                      </Link>
                    </AnimePost>
                  </Tooltip>
                )
              })}
          </Grid>

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
              <Spinner size="lg" color="green.500" />
            </LoadingPaginationContainer>
          ) : null}
        </ModalContent>
      </Scroll>
    </Modal>
  )
}

export default DesktopSearchModal

const Modal = tw(
  motion.div,
)`absolute hidden md:block top-0 left-0 bg-white dark:bg-black bg-opacity-90! z-40`

const Scroll = tw(
  OverlayScrollbarsComponent,
)`pt-32 px-8 w-screen h-screen overflow-hidden!`

const ModalContent = tw.div`flex flex-col items-center`

const SearchInputGroup = tw(InputGroup)`w-full md:w-2/3! xl:w-1/2! `

const SearchInput = tw(
  Input,
)`text-gray-900! dark:text-white! mb-20 placeholder-gray-800! dark:placeholder-gray-400!`

const ModalSearchIcon = tw(
  HiSearch,
)`w-5 h-5 mt-1.5 text-gray-400 dark:text-gray-700`

const EmptyContainer = tw.div`flex items-center flex-col opacity-50`

const EmptyIcon = tw(HiInbox)`mb-2`

const LoadingPaginationContainer = tw.div`mb-7`

const Grid = tw.div`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 pb-10`

const AnimePost = tw.span`cursor-pointer`
