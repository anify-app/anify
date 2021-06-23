import tw from 'twin.macro'

type TooltipProps = {
  children: React.ReactNode
  label: React.ReactNode
}

const Tooltip = ({ children, label }: TooltipProps) => {
  return (
    <Container>
      {children}
      <TooltipContainer>
        <TooltipText>{label}</TooltipText>
      </TooltipContainer>
    </Container>
  )
}

export default Tooltip

const Container = tw.div`relative`

const TooltipContainer = tw.div`absolute left-full top-1/2 bg-gray-900 px-6 py-1`

const TooltipText = tw.p`text-white`
