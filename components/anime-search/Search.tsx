import { useState, useRef, useEffect } from 'react'
import tw from 'twin.macro'
import { HiSearch } from 'react-icons/hi'
import { Divider } from '@chakra-ui/react'
import { gql, useQuery } from '@apollo/client'
import { useDebounce } from 'react-use'
import { AnimatePresence } from 'framer-motion'
import DesktopSearchModal from './DesktopSearchModal'
import MobileSearchModal from './MobileSearchModal'

const SEARCH_QUERY = gql`
  query SearchAnime($query: String!, $page: Int, $hitsPerPage: Int) {
    searchAnime(query: $query, page: $page, hitsPerPage: $hitsPerPage) {
      hits {
        slug
        title
        mainImage
        type
        status
        genres
        mainImageBlurred
        score
      }
      hasNextPage
      page
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
        page: 0,
        hitsPerPage: 20,
      },
      skip: apolloSearchTerm === '',
    },
  )
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

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

  const onPaginate = () =>
    searchQuery.fetchMore({
      variables: {
        page: (searchQuery.data?.searchAnime.page || 0) + 1,
      },
    })

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
          <>
            <MobileSearchModal
              onClose={() => setIsModalOpen(false)}
              searchTerm={clientSearchTerm}
              onSearchTermChange={(v) => setClientSearchTerm(v)}
              searchQuery={searchQuery}
              searchInputRef={searchInputRef}
              onPaginate={onPaginate}
            />
            <DesktopSearchModal
              onClose={() => setIsModalOpen(false)}
              searchTerm={clientSearchTerm}
              onSearchTermChange={(v) => setClientSearchTerm(v)}
              searchQuery={searchQuery}
              searchInputRef={searchInputRef}
              onPaginate={onPaginate}
            />
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Search

const Container = tw.button`flex items-center ml-0 md:ml-8 mr-3 md:mr-0 place-self-end md:place-self-start self-center hover:text-emerald-500 transition-colors cursor-pointer`

const SectionDivider = tw(Divider)`pr-8 hidden md:inline`

const HeaderSearchIcon = tw(HiSearch)`h-6 w-6 md:h-4 md:w-4`

const SearchButtonText = tw.span`hidden md:inline`
