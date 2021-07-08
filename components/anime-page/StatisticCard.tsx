import tw from 'twin.macro'

type StatisticCardProps = {
  icon?: React.ReactNode
  label: string
  value: React.ReactNode
}

const StatisticCard = ({ icon, label, value }: StatisticCardProps) => {
  return (
    <Card>
      {icon}
      <div>
        <Field>{label}</Field>
        <Value>{value}</Value>
      </div>
    </Card>
  )
}

export default StatisticCard

const Card = tw.div`flex items-center bg-white dark:bg-gray-800 p-4 rounded leading-5`

const Field = tw.p`font-bold text-sm`

const Value = tw.span`text-gray-500 dark:text-gray-400 text-xl`
