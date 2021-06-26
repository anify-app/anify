import { Badge } from '@chakra-ui/react'

type StatusBadgeProps = {
  status: string
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge
      colorScheme={(() => {
        if (status === 'finished') return 'green'
        if (status === 'upcoming') return 'purple'
        if (status === 'ongoing') return 'yellow'
        return 'gray'
      })()}
    >
      {status}
    </Badge>
  )
}

export default StatusBadge
