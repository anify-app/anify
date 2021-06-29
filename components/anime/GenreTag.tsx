import { Tag } from '@chakra-ui/react'

type GenreTagProps = {
  children: string
  variant?: 'outline' | 'solid' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
}

const GenreTag = ({ children, variant, size }: GenreTagProps) => {
  return (
    <>
      <Tag colorScheme="blue" variant={variant} size={size}>
        {children}
      </Tag>
      &nbsp;
    </>
  )
}

export default GenreTag
