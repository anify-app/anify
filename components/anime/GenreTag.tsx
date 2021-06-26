import { Tag } from '@chakra-ui/react'

type GenreTagProps = {
  children: string
}

const GenreTag = ({ children }: GenreTagProps) => {
  return (
    <>
      <Tag colorScheme="blue">{children}</Tag>
      &nbsp;
    </>
  )
}

export default GenreTag
