import { Badge } from '@chakra-ui/react'

type TypeBadgeProps = {
  type: string
  variant?: 'outline' | 'solid' | 'subtle'
}

const TypeBadge = ({ type, variant = 'solid' }: TypeBadgeProps) => {
  return (
    <Badge colorScheme="gray" variant={variant}>
      {type}
    </Badge>
  )
}

export default TypeBadge
