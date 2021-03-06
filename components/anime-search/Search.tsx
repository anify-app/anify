import { useState, useEffect, useLayoutEffect } from 'react'
import tw from 'twin.macro'
import { HiSearch } from 'react-icons/hi'
import { Divider } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { useDebounce } from 'react-use'
import { AnimatePresence } from 'framer-motion'
import { SEARCH_ANIME } from 'gql'
import DesktopSearchModal from './DesktopSearchModal'
import MobileSearchModal from './MobileSearchModal'

type SearchProps = {
  isSearchModalOpen: boolean
  onSearchModalOpen: (val: boolean) => void
}

const Search = ({ isSearchModalOpen, onSearchModalOpen }: SearchProps) => {
  const [clientSearchTerm, setClientSearchTerm] = useState('')
  const [apolloSearchTerm, setApolloSearchTerm] = useState('')
  const searchQuery = useQuery<{ searchAnime: Query['searchAnime'] }>(
    SEARCH_ANIME,
    {
      variables: {
        query: apolloSearchTerm,
        page: 0,
        hitsPerPage: 12,
      },
      skip: apolloSearchTerm === '',
    },
  )

  useDebounce(
    () => {
      setApolloSearchTerm(clientSearchTerm)
    },
    500,
    [clientSearchTerm],
  )

  // reset searchTerm when modal state changes
  useEffect(() => {
    setClientSearchTerm('')
    setApolloSearchTerm('')
  }, [isSearchModalOpen])

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
          onSearchModalOpen(true)
        }}
      >
        <SectionDivider orientation="vertical" height={9} />
        <HeaderSearchIcon />
        <SearchButtonText>&nbsp; Search anime</SearchButtonText>
      </Container>

      {isSearchModalOpen ? (
        <>
          <MobileSearchModal
            onClose={() => onSearchModalOpen(false)}
            searchTerm={clientSearchTerm}
            onSearchTermChange={(v) => setClientSearchTerm(v)}
            searchQuery={searchQuery}
            onPaginate={onPaginate}
          />
          <DesktopSearchModal
            onClose={() => onSearchModalOpen(false)}
            searchTerm={clientSearchTerm}
            onSearchTermChange={(v) => setClientSearchTerm(v)}
            searchQuery={searchQuery}
            onPaginate={onPaginate}
          />
        </>
      ) : null}
    </>
  )
}

export default Search

const Container = tw.button`flex items-center h-full ml-0 md:ml-8 mr-3 md:mr-0 place-self-end md:place-self-start self-center hover:color[var(--primary-color)] dark:hover:color[var(--primary-color-dark)] transition-colors cursor-pointer`

const SectionDivider = tw(Divider)`pr-8 hidden md:inline`

const HeaderSearchIcon = tw(HiSearch)`h-6 w-6 md:h-4 md:w-4`

const SearchButtonText = tw.span`hidden md:inline`
