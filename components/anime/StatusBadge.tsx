import { Badge } from '@chakra-ui/react'

type StatusBadgeProps = {
  status: string
  variant?: 'outline' | 'solid' | 'subtle'
}

const StatusBadge = ({ status, variant = 'solid' }: StatusBadgeProps) => {
  return (
    <Badge
      colorScheme={(() => {
        if (status === 'finished') return 'green'
        if (status === 'upcoming') return 'purple'
        if (status === 'ongoing') return 'yellow'
        return 'gray'
      })()}
      variant={variant}
    >
      {status}
    </Badge>
  )
}

export default StatusBadge
