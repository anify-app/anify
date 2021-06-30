import { useState, useRef, useEffect } from 'react'
import tw from 'twin.macro'
import { HiSearch } from 'react-icons/hi'
import {
  Divider,
  Input,
  Tooltip,
  useColorMode,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Spinner,
} from '@chakra-ui/react'
import { gql, useQuery } from '@apollo/client'
import Image from 'next/image'
import { useDebounce } from 'react-use'
import { isPresent } from 'utils'
import { AnimeTooltipLabel } from 'components/anime-search'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

const SEARCH_QUERY = gql`
  query SearchAnime($query: String!) {
    searchAnime(query: $query) {
      slug
      title
      mainImage
      type
      status
      genres
      mainImageBlurred
    }
  }
`

const Search = () => {
  const [clientSearchTerm, setClientSearchTerm] = useState('')
  const [apolloSearchTerm, setApolloSearchTerm] = useState('')
  const searchQuery = useQuery<{ searchAnime: Query['searchAnime'] }>(
    SEARCH_QUERY,
    {
      variables: {
        query: apolloSearchTerm,
      },
      skip: apolloSearchTerm === '',
    },
  )
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { colorMode } = useColorMode()

  useDebounce(
    () => {
      setApolloSearchTerm(clientSearchTerm)
    },
    500,
    [clientSearchTerm],
  )

  // focus the text input when the modal opens
  useEffect(() => {
    searchInputRef.current?.focus()

    // reset searchTerm when modal is closed
    if (!isModalOpen) setClientSearchTerm('')
  }, [isModalOpen])

  return (
    <>
      <Container
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
        <SectionDivider orientation="vertical" height={9} />
        <HeaderSearchIcon />
        <SearchButtonText>&nbsp; Search anime</SearchButtonText>
      </Container>
      <AnimatePresence>
        {isModalOpen ? (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            onClick={() => setIsModalOpen(false)}
          >
            <Scroll
              className={
                colorMode === 'dark' ? 'os-theme-light' : 'os-theme-dark'
              }
              options={{ scrollbars: { autoHide: 'scroll' } }}
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
                    onChange={(e) => setClientSearchTerm(e.target.value)}
                    focusBorderColor="green.500"
                    variant="flushed"
                    textColor={colorMode === 'dark' ? 'gray.700' : 'gray.400'}
                    borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.400'}
                  />
                  <InputRightElement pointerEvents="none">
                    {searchQuery.loading ? (
                      <LoadingSearchIcon size="sm" color="green.500" />
                    ) : null}
                  </InputRightElement>
                </SearchInputGroup>
                <Grid>
                  {searchQuery.data?.searchAnime
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
              </ModalContent>
            </Scroll>
          </Modal>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Search

const Container = tw.button`flex items-center ml-0 md:ml-8 mr-3 md:mr-0 place-self-end md:place-self-start self-center hover:text-emerald-500 transition-opacity cursor-pointer`

const SectionDivider = tw(Divider)`pr-8 hidden md:inline`

const HeaderSearchIcon = tw(HiSearch)`h-6 w-6 md:h-4 md:w-4`

const SearchButtonText = tw.span`hidden md:inline`

const Modal = tw(
  motion.div,
)`absolute top-0 left-0 bg-white dark:bg-black bg-opacity-90! z-40`

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

const LoadingSearchIcon = tw(Spinner)`w-5 h-5 mt-1.5`

const Grid = tw.div`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 pb-14`

const AnimePost = tw.span`cursor-pointer`
