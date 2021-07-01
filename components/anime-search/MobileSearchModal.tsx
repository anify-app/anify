import Image from 'next/image'
import { isPresent } from 'utils'
import Link from 'next/link'
import {
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Spinner,
  Input,
  useColorMode,
  Divider,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { OperationVariables, QueryResult } from '@apollo/client'
import tw, { styled } from 'twin.macro'
import { HiSearch } from 'react-icons/hi'
import { TypeBadge, StatusBadge, GenreTag } from 'components/anime'

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
  searchInputRef: React.RefObject<HTMLInputElement>
}

const MobileSearchModal = ({
  onClose,
  searchTerm: clientSearchTerm,
  onSearchTermChange,
  searchQuery,
  searchInputRef,
}: MobileSearchModalProps) => {
  const { colorMode } = useColorMode()

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
              onChange={(e) => onSearchTermChange(e.target.value)}
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
          <List>
            {searchQuery.data?.searchAnime.filter(isPresent).map((anime) => {
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
                          priority
                        />
                      </ImageContainer>
                      <Information>
                        <Title>
                          <TitleText>{anime?.title}</TitleText>
                          &nbsp;&nbsp;
                          <Badges>
                            {anime?.type ? (
                              <TypeBadge type={anime.type} />
                            ) : null}
                            &nbsp;
                            {anime?.status ? (
                              <StatusBadge status={anime.status} />
                            ) : null}
                          </Badges>
                        </Title>
                        {anime?.genres
                          ? anime.genres
                              .filter(isPresent)
                              .map((genre, index) => (
                                <GenreTag key={`genre-${index}`}>
                                  {genre}
                                </GenreTag>
                              ))
                          : null}
                      </Information>
                    </AnimeCard>
                  </Link>
                  <Divider p={2} />
                </AnimePost>
              )
            })}
          </List>
        </ModalContent>
      </Scroll>
    </Modal>
  )
}

export default MobileSearchModal

const Modal = tw(
  motion.div,
)`absolute block md:hidden top-0 left-0 bg-white dark:bg-black bg-opacity-100! z-40`

const Scroll = tw(
  OverlayScrollbarsComponent,
)`pt-20 px-8 w-screen h-screen overflow-hidden!`

const ModalContent = tw.div`flex flex-col items-center`

const SearchInputGroup = tw(InputGroup)`w-full`

const SearchInput = tw(
  Input,
)`text-gray-900! dark:text-white! mb-20 placeholder-gray-800! dark:placeholder-gray-400!`

const ModalSearchIcon = tw(
  HiSearch,
)`w-5 h-5 mt-1.5 text-gray-400 dark:text-gray-700`

const LoadingSearchIcon = tw(Spinner)`w-5 h-5 mt-1.5`

const List = tw.div`grid grid-cols-1 gap-4 pb-14 w-full`

const AnimePost = tw.span`cursor-pointer`

const AnimeCard = tw.div`flex flex-row items-center w-full pt-0.5`

const TitleText = tw.h2`inline text-xl align-middle`

const Information = tw.div`ml-4 flex-grow`

const Badges = tw.span``

const Title = tw.div`mb-2 leading-4`

const ImageContainer = styled.div`
  width: 56.25px;
`
