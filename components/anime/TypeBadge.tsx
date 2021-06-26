import { Badge } from '@chakra-ui/react'

type TypeBadgeProps = {
  type: string
}

const TypeBadge = ({ type }: TypeBadgeProps) => {
  return <Badge colorScheme="gray">{type}</Badge>
}

export default TypeBadge
