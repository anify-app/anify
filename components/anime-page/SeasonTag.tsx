import { Tag } from '@chakra-ui/react'

type SeasonTagProps = {
  children: string
}

const SeasonTag = ({ children }: SeasonTagProps) => {
  const getTagColor = () => {
    if (children.toLowerCase().includes('fall')) return 'orange'
    if (children.toLowerCase().includes('winter')) return 'teal'
    if (children.toLowerCase().includes('spring')) return 'pink'
    if (children.toLowerCase().includes('summer')) return 'red'

    return 'gray'
  }

  return (
    <Tag colorScheme={getTagColor()} size="sm">
      {children}
    </Tag>
  )
}

export default SeasonTag
