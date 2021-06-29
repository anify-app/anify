import { useState, useRef, useEffect } from 'react'
import tw from 'twin.macro'
import { HiSearch } from 'react-icons/hi'
import { Divider, Input } from '@chakra-ui/react'

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // focus the text input when the modal opens
  useEffect(() => {
    searchInputRef.current?.focus()
  }, [isModalOpen])

  return (
    <>
      <Container
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
        <SectionDivider orientation="vertical" height={9} />
        <HiSearch />
        &nbsp; Search anime
      </Container>
      {isModalOpen ? (
        <Modal onClick={() => setIsModalOpen(false)}>
          <SearchInput
            onClick={(e) => e.stopPropagation()}
            size="lg"
            placeholder="Search anime"
            ref={searchInputRef}
          />
        </Modal>
      ) : null}
    </>
  )
}

export default Search

const Container = tw.button`flex items-center ml-8 opacity-70 hover:opacity-100 transition-opacity cursor-pointer`

const SectionDivider = tw(Divider)`pr-8`

const Modal = tw.div`absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-40 flex justify-center pt-60`

const SearchInput = tw(Input)`bg-white! w-1/3! text-black`
