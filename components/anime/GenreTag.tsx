import { Tag } from '@chakra-ui/react'
import tw from 'twin.macro'

type GenreTagProps = {
  children: string
  variant?: 'outline' | 'solid' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
}

const GenreTag = ({ children, variant, size }: GenreTagProps) => {
  return (
    <SpacedTag colorScheme="blue" variant={variant} size={size}>
      {children}
    </SpacedTag>
  )
}

export default GenreTag

const SpacedTag = tw(Tag)`mr-1 mb-1`
